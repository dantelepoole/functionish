/**
 * @module lib/List
 * @ignore
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for(`functionish/List/transform#REJECT`);
const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';
const VALUE_NONE = Symbol.for(`functionish/List/#VALUE_NONE`);

const batchreader = (batchsize, iterator) => () => readbatch(batchsize, iterator);

const isdefined = x => (x ?? VALUE_NONE) !== VALUE_NONE;
const isfunction = x => (typeof x === TYPE_FUNCTION);
const isvoid = x => (x ?? VALUE_NONE) === VALUE_NONE;
const notstring = x => (typeof x !== TYPE_STRING);

const hashentry = hashfunc => x => [ hashfunc(x), x ];
const isiterable = list => isfunction(list?.[Symbol.iterator]) && notstring(list);
const iterator = list => list[Symbol.iterator]();

const listfromgenerator = generator => new List( { [Symbol.iterator]:generator } );

const lookupgroup = target => key => isvoid(key) ? GROUP_NONE
                                   : isvoid(target[key]) ? (target[key] = [])
                                   : target[key];
class List {

    #sourcelist = undefined;

    constructor(source) {
        this.#sourcelist = source;
    }

    all(predicate, ...partialargs) {

        for(const item of this) if( !predicate(...partialargs, item) ) return false;

        return true;
    }

    any(predicate, ...partialargs) {

        for(const item of this) if( predicate(...partialargs, item) ) return true;

        return false;
    }

    append(...values) {

        return (values.length === 0)
             ? this
             : listfromgenerator( listappend(this, values) );
    }

    batch(batchsize) {
        return listfromgenerator( batchlist(this, batchsize) );
    }

    collect() {
        return [...this];
    }

    concat(...items) {

        return (items.length === 0)
             ? this
             : listfromgenerator( listconcat(this, items) );
    }
    
    diff(list, hashfunc) {
        return listfromgenerator( listdiff(this, list, hashfunc) );
    }

    filter(...filters) {

        const compositefilter = composefilter(filters);
        return listfromgenerator( filterlist(compositefilter, this) );
    }

    find(predicate) {
        for(const item of this) if( predicate(item) ) return item;
    }

    flat() {
        return listfromgenerator( flatlist(this) );
    }

    groupby(keyselector) {

        const target = {};
        const getgroup = lookupgroup(target);

        for(const value of this) {

            const key = keyselector(value);

            isdefined(key) && getgroup(key)?.push(value);
        }

        return target;
    }

    includes(value, hashfunc) {

        if(hashfunc) for(const item of this) if( hashfunc(item) === value ) return true;
        else for(const item of this) if(item === value) return true;
        
        return false;
    }

    intersect(list, hashfunc) {
        return listfromgenerator( listintersect(this, list, hashfunc) );
    }

    iterate(func, ...partialargs) {

        for(const item of this) func(...partialargs, item);

        return this;
    }

    iterator() {
        return iterator(this);
    }

    map(...mapfuncs) {
        
        const compositemap = composemap(mapfuncs);

        return listfromgenerator( maplist(compositemap, this) );
    }

    none(predicate, ...partialargs) {

        for(const item of this) if( predicate(...partialargs, item) ) return false;

        return true;
    }

    partition(divider) {

        const partition1 = [];
        const partition2 = [];

        for(const value of this) divider(value) ? partition1.push(value) : partition2.push(value);

        return [ new List(partition1), new List(partition2) ];
    }

    reader(terminationvalue=undefined) {

        const listiterator = iterator(this);
        let nextitem = listiterator.next();

        _readnextlistitem.hasnext = () => !nextitem.done;

        return _readnextlistitem;

        function _readnextlistitem() {
            
            if(nextitem.done) return terminationvalue;

            const item = nextitem;
            
            nextitem = listiterator.next();

            return item.value;
        }
    }

    reduce(reducer, initialvalue=undefined) {

        return (arguments.length === 1)
             ? reduce( selfreducer(reducer), initialvalue, this )
             : reduce(reducer, initialvalue, this);
    }

    reverse() {
        return listfromgenerator( reverselist(this) );
    }

    stateful() {
        return listfromgenerator( statefullist(this) );
    }

    symdiff(list, hashfunc) {
        return listfromgenerator( listdiffsymmetric(this, list, hashfunc) );
    }

    take(count) {
        return listfromgenerator( listtake(this, count) );
    }

    transform(...transformations) {
        return listfromgenerator( listtransform(this, transformations) );
    }

    transduce(transducer, reducer, initialvalue) {

        isfunction(transducer) || (transducer = this.transducer(...transducer));

        return (arguments.length === 2)
             ? this.reduce( transducer(reducer) )
             : this.reduce( transducer(reducer), initialvalue );
    }

    transducer(...transformations) {

        const transformer = composetransformer(transformations);

        const _transducer = reducer => (acc, value) => transformreduce(transformer, reducer, acc, value);
        return _transducer;
    }

    uniq(hashfunc) {
        return new List( uniqlist(this, hashfunc) );
    }

    union(...lists) {

        return (lists.length === 0)
             ? this
             : listfromgenerator( listunion(this, ...lists) );
    }

    wrap(wrapper) {
        
        const wrapped = wrapper(this);

        return isfunction(wrapped) ? listfromgenerator(wrapped)
             : isiterable(wrapped) ? new List(wrapped)
             : raisenotiterable();
    }

    zip(list,short=true) {
        return listfromgenerator( ziplists(this, list, short) );
    }

    zipwith(zipper, list, short=true) {
        return listfromgenerator( ziplistswith(zipper, this, list, short) );
    }

    *[Symbol.iterator]() {
        yield* this.#sourcelist;
    }
}

function batchlist(list, batchsize) {

    return function* _generatebatchlist() {

        const nextbatch = batchreader(batchsize, iterator(list));
        let batch = nextbatch();

        while(batch.length > 0) {

            yield new List(batch);

            if(batch.length < batchsize) return;

            batch = nextbatch();
        }
    }
}

function composefilter(filters) {

    if(filters.length === 1) return filters[0];

    return function _composedfilter(value) {

        for(let index = 0; index < filters.length; index += 1) if( !filters[index](value) ) return false;

        return true;
    }
}

function composemap(mapfuncs) {

    if(mapfuncs.length === 1) return mapfuncs[0];

    return function _composedmap(value) {

        for(let index = 0; index < mapfuncs.length; index += 1) value = mapfuncs[index](value);

        return value;
    }
}

function composetransformer(transformations) {

    return function _transformer(value) {

        for(let index = 0; index < transformations.length; index += 1) {

            const transformedvalue = transformations[index](value);

            if(transformedvalue === true) continue;
            if(transformedvalue === false) return TRANSFORM_REJECT;

            value = transformedvalue; 
        }

        return value;
    }
}

function filterlist(filter, list) {
 
    return function* _generatefilteredlist() {
        for(const value of list) if( filter(value) ) yield value;
    }
}

function flatlist(list) {

    return function* _generateflatlist() {
        for(const item of list) isiterable(item) ? yield* item : yield item;
    }
}


function isuniqfactory(hashfunc) {

    const dedup = new Set();

    return isfunction(hashfunc)
         ? value => (dedup.size < dedup.add( hashfunc(value) ).size)
         : value => (dedup.size < dedup.add(value).size)
}

function listappend(list, values) {

    return function* _generateappendedlist() {
        yield* list;
        yield* values;
    }
}

function listconcat(list, items) {

    return function* _generateconcatenatedlist() {
        yield* list;
        for(const item of items) isiterable(item) ? (yield* item) : yield item;
    }
}

function listdiff(list1, list2, hashfunc) {

    return function* _generatediffedlist() {

        if(hashfunc) list2 = listfromgenerator( maplist(hashfunc, list2) );

        const dedup2 = new Set(list2);
    
        const isdiffanduniq = hashfunc
                            ? value => (dedup2.size < dedup2.add( hashfunc(value) ).size)
                            : value => (dedup2.size < dedup2.add(value).size);
    
        for(const item of list1) if( isdiffanduniq(item) ) yield item;
    }
}

function listdiffsymmetric(list1, list2, hashfunc) {
    throw new Error('listdiffsymmetric not yet implemented');
}

function listintersect(list1, list2, hashfunc) {

    return function* _generateintersectionlist() {

        const dedup2 = hashfunc
                     ? new Set( maplist(hashfunc, list2)() )
                     : new Set(list2);

        for(const item of list1) if( dedup2.has(item) ) yield item;

    }
}

function listtake(list, count) {

    return function* _generatetakenlist() {

        const listiterator = iterator(list);
        let index = 0;

        while(index < count) {

            const item = listiterator.next();
            
            if(item.done) return item.value;
            
            index += 1;

            yield item.value;
        }
    }
}

function listtransform(list, transformations) {

    const transformer = composetransformer(transformations);

    return function* _generatetransformedlist() {

        for(const value of list) {

            const transformedvalue = transformer(value);

            if(transformedvalue !== TRANSFORM_REJECT) yield value;
        }
    }
}

function listunion(...lists) {

    return function* _generatelistunion() {
        for(const list of lists) yield* list;
    }
}

function maplist(mapfunc,list) {

    return function* _generatemappedlist() {
        for(const value of list) yield mapfunc(value);
    }
}

function raisenotiterable() {
    throw new TypeError(`The argument is not iterable`);
}

function readbatch(batchsize, iterator) {

    (batchsize > 0) || (batchsize = 1);

    const batch = Array(batchsize);

    let item = iterator.next();
    let count = 0;

    while( !item.done ) {

        batch[count] = item.value;
        count += 1;

        if(count === batchsize) return batch;

        item = iterator.next();
    }

    batch.length = count;

    return batch;
}

function reduce(reducer, initialvalue, list) {

    let isaborted = false;
    const abort = result => (isaborted = true, result);
    
    let accumulator = initialvalue;

    for(const nextvalue of list) {

        accumulator = reducer(accumulator, nextvalue, abort);

        if(isaborted) break;
    }

    return accumulator;
}

function reverselist(list) {

    return function* _generatereverselist() {

        const array = Array.isArray(list) ? list : [...list];

        for(let i = array.length; i >= 0; i -= 1) yield array[i];
    }
}

function selfreducer(reducer) {

    let reducenext = (_,nextvalue) => (reducenext=reducer, nextvalue);

    return (...args) => reducenext(...args);
}

function statefullist(source) {

    let listiterator = null;

    return function* _generatestatefullist() {

        if(listiterator === null) listiterator = iterator(source);

        while(true) {

            const item = listiterator.next();

            if(item.done) return item.value;

            yield item.value;
        }
    }
}

function transformreduce(transformer, reducer, accumulator, nextvalue) {

    const transformedvalue = transformer(nextvalue);

    return (transformedvalue === TRANSFORM_REJECT)
            ? accumulator
            : reducer(accumulator, transformedvalue);
}

function uniqlist(list, hashfunc) {

    return function* _generateuniqlist() {

        const isuniq = isuniqfactory(hashfunc);

        for(const item of list) isuniq(item) && (yield item);
    }
}

function ziplists(list1, list2, short) {

    return function* _generatezippedlist() {

        const iterator2 = iterator(list2);

        let item2 = { done:true };

        for(const value of list1) {

            item2 = iterator2.next();

            if(short && item2.done) return;

            yield item2.done ? [value, undefined] : [value, item2.value];
        }

        if(short) return;

        while( !item2.done ) {
     
            item2 = iterator2.next();
     
            item2.done || (yield [undefined, item2.value]);
        }
    }
}

function ziplistswith(zipper, list1, list2, short) {

    return function* _generatezipwithlist() {

        const iterator2 = iterator(list2);

        let item2 = { done:true };

        for(const value of list1) {

            item2 = iterator2.next();

            if(short && item2.done) return;

            yield item2.done ? zipper(value, undefined) : zipper(value, item2.value);
        }

        if(short) return;

        while( !item2.done ) {

            item2 = iterator.next();
            
            item2.done || (yield zipper(undefined, item2.value));
        }
    }
}

module.exports = List;