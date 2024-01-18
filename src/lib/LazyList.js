/**
 * @module lib/LazyList
 * @ignore
 */

'use strict';

const SYMBOL_DUCKTYPE = Symbol.for('functionish/lib/LazyList/Symbol.DuckType');
const CONSTRUCTORLOCK = Symbol('functionish/lib/LazyList/constructorlock');

const ERR_BAD_DEPTH = `functionish/lib/LazyList.flat:The depth is negative or not a number.`;
const ERR_BAD_FILTERPREDICATE = `functionish/lib/LazyList.filter: The predicate has type %s. Expected a function.`;
const ERR_BAD_FLATMAP_DEPTH = `functionish/lib/LazyList.flatMap:The depth is negative or not a number.`;
const ERR_BAD_FLATMAP_MAPFUNCTION = `functionish/lib/LazyList.flatMap: The map function has type %s. Expected a function.`;
const ERR_BAD_MAPFUNCTION = `functionish/lib/LazyList.map: The map function has type %s. Expected a function.`;
const ERR_BAD_REDUCER = `functionish/lib/LazyList.reduce: The reducer has type %s. Expected a function.`;
const ERR_BAD_RIGHT_REDUCER = `functionish/lib/LazyList.reduceRight: The reducer has type %s. Expected a function.`;
const ERR_BAD_SORTFUNCTION = `functionish/lib/LazyList.sort: The compare function has type %s. Expected a function.`;
const ERR_BAD_SOURCE = 'functionish/lib/LazyList.from: The argument is neither interable nor a function.';
const ERR_INSTANTIATIONERROR = 'functionish/lib/LazyList: The LazyList class cannot be instantiated directly.';

const format = require('util').format;

const maximumvalue = Math.max;
const notstring = x => (typeof x !== 'string');
const truncate = Math.trunc;

const casttopositiveinteger = x => maximumvalue(0, truncate( +x || 0 ));

const getiteratorfunction = iterable => iterable[Symbol.iterator].bind(iterable);
const isconstructorlock = lock => (lock === CONSTRUCTORLOCK);
const isempty = array => (array.length === 0);
const isfunction = func => (typeof func === 'function');
const isiterable = obj => isfunction(obj?.[Symbol.iterator]);
const isflattenable = obj => notstring(obj) && isfunction(obj?.[Symbol.iterator]);
const islazylist = obj => (obj?.[SYMBOL_DUCKTYPE] === SYMBOL_DUCKTYPE);
const ispositiveinteger = num => (Number.isSafeInteger(num) && (num >= 0));
const issingleton = array => (array.length === 1);
const newlazylist = iteratorfunc => ( new LazyList(iteratorfunc, CONSTRUCTORLOCK) );
const raisebaddepth = () => { throw new TypeError(ERR_BAD_DEPTH) }
const raisebadfilterpredicate = predicate => { throw new TypeError( format(ERR_BAD_FILTERPREDICATE, typeof predicate) ) }
const raisebadflatMapdepth = () => { throw new TypeError(ERR_BAD_FLATMAP_DEPTH) }
const raisebadflatMapmapfunction = mapfunc => { throw new TypeError( format(ERR_BAD_FLATMAP_MAPFUNCTION, typeof mapfunc) ) }
const raisebadmapfunction = mapfunc => { throw new TypeError( format(ERR_BAD_MAPFUNCTION, typeof mapfunc) ) }
const raisebadreducer = reducer => { throw new TypeError( format(ERR_BAD_REDUCER, typeof reducer) ) }
const raisebadrightreducer = reducer => { throw new TypeError( format(ERR_BAD_RIGHT_REDUCER, typeof reducer) ) }
const raisebadsortfunction = comparefunc => { throw new TypeError( format(ERR_BAD_SORTFUNCTION, typeof comparefunc) ) }
const raisebadsourceerror = source => { throw new TypeError( format(ERR_BAD_SOURCE, typeof source)) }
const raiseconstructorlockerror = () => { throw new Error(ERR_INSTANTIATIONERROR) }
const True = () => true;

class LazyList {

    static from(source) {

        return  isfunction(source) && newlazylist(source)
             || islazylist(source) && source
             || isiterable(source) && newlazylist( getiteratorfunction(source) )
             || raisebadsourceerror(source);
    }

    constructor(iteratorfunc, lock) {

        isconstructorlock(lock) || raiseconstructorlockerror();

        this[Symbol.iterator] = iteratorfunc;
    }

    filter(predicate) {

        isfunction(predicate) || raisebadfilterpredicate(predicate);

        const _listfilter = listfilter.bind(null, predicate, this[Symbol.iterator]);

        return newlazylist(_listfilter);
    }

    flat(depth=1) {

        ispositiveinteger(depth) || raisebaddepth();

        const _listflat = listflat.bind(null, depth, this);

        return newlazylist(_listflat);
    }

    flatMap(mapfunc, depth=1) {

        isfunction(mapfunc) || raisebadflatMapmapfunction(mapfunc);
        ispositiveinteger(depth) || raisebadflatMapdepth();

        const _listflatMap = listflatMap.bind(null, depth, mapfunc, this);

        return newlazylist(_listflatMap);
    }

    map(mapfunc) {

        isfunction(mapfunc) || raisebadmapfunction(mapfunc);

        const _listmap = listmap.bind(null, mapfunc, this[Symbol.iterator]);

        return newlazylist(_listmap);
    }

    reduce(reducer, initialvalue) {

        isfunction(reducer) || raisebadreducer(reducer);

        return issingleton(arguments) 
             ? listreduceauto(reducer, this[Symbol.iterator])
             : listreduce(reducer, initialvalue, this[Symbol.iterator]);
    }

    reduceRight(reducer, initialvalue) {

        isfunction(reducer) || raisebadrightreducer(reducer);

        return issingleton(arguments)
             ? listreducerightauto(reducer, this[Symbol.iterator])
             : listreduceright(reducer, initialvalue, this[Symbol.iterator]);
    }

    reverse() {

        const _listreverse = listreverse.bind(null, this[Symbol.iterator]);

        return newlazylist(_listreverse);
    }

    slice(start=0, end) {

        const _listslice = (arguments.length < 2)
                         ? listslicepartial.bind(null, this[Symbol.iterator], start)
                         : listslicerange.bind(null, this[Symbol.iterator], start, end);

        return newlazylist(_listslice);
    }

    sort(comparefunc) {

        const _listsort = isempty(arguments) ? listsort.bind(null, this[Symbol.iterator])
                        : isfunction(comparefunc) ? listsortcustom.bind(null, comparefunc, this[Symbol.iterator])
                        : raisebadsortfunction(comparefunc);
        
        return newlazylist(_listsort);
    }

    get [SYMBOL_DUCKTYPE]() {
        return SYMBOL_DUCKTYPE;
    
    }
    [Symbol.iterator]
}

function* listfilter(predicate, iteratorfunc) {
    for(const item of iteratorfunc()) predicate(item) && (yield item);
}

function* listflat(depth, list) {

    if(depth === 0) {

        yield* list;

    } else {
        
        for(const item of list) {
            isflattenable(item)
            ? yield* listflat(depth-1, item)
            : yield item;
        }
    }
}

function* listflatMap(depth, mapfunc, list) {

    if(depth === 0) {

        for(const item of list) yield mapfunc(item);

    } else {

        for(const item of list) {
            
            const mappeditem = mapfunc(item);

            isflattenable(mappeditem)
            ? yield* listflatMap(depth-1, mappeditem)
            : yield mappeditem;
        }
    }
}

function* listmap(mapfunc, iteratorfunc) {
    for(const item of iteratorfunc()) yield mapfunc(item);
}

function listreduce(reducer, initialvalue, iteratorfunc) {

    let result = initialvalue;

    for(const item of iteratorfunc()) result = reducer(result, item);

    return result;
}

function listreduceauto(reducer, iteratorfunc) {

    let isvirgin = true;
    let result = undefined;

    const initresult = value => True(result = value, isvirgin = false);

    for(const item of iteratorfunc()) {
        isvirgin && initresult(item) || (result = reducer(result, item));
    }

    return result;
}

function listreduceright(reducer, initialvalue, iteratorfunc) {
    return Array.from( iteratorfunc() ).reduceRight(reducer, initialvalue);
}

function listreducerightauto(reducer, iteratorfunc) {

    const array = Array.from( iteratorfunc() );
    const initialitem = array.pop();

    return array.reduceRight(reducer, initialitem);
}

function* listreverse(iteratorfunc) {

    const array = Array.from( iteratorfunc() );

    for(let i=array.length-1; i >= 0; i -= 1) yield array[i];
}

function* listslicepartial(iteratorfunc, start) {

    start = casttopositiveinteger(start);

    const iterator = iteratorfunc();
    skiptoindex(start, iterator);

    yield* iterator;
}

function* listslicerange(iteratorfunc, start, end) {

    start = casttopositiveinteger(start);
    end = casttopositiveinteger(end);

    const iterator = iteratorfunc();
    skiptoindex(start, iterator);

    if(end > start) {

        let item = iterator.next();
        let itemindex = start;

        while( ! (item.done || itemindex === end) ) {
            
            yield item.value;
            item = iterator.next();

            itemindex += 1;
        }
    }
}

function* listsort(iteratorfunc) {
    yield* Array.from( iteratorfunc() ).sort();
}

function* listsortcustom(comparefunc, iteratorfunc) {
    yield* Array.from( iteratorfunc() ).sort(comparefunc);
}

function skiptoindex(targetindex, iterator) {

    if(targetindex > 0) {

        let counter = 0;
        
        while(counter != targetindex && !iterator.next().done) counter += 1;
    }
}

module.exports = LazyList;