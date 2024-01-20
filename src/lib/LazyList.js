/**
 * @module lib/LazyList
 * @ignore
 */

'use strict';

const CONSTRUCTORLOCK = Symbol('functionish/lib/LazyList/constructorlock');

const ERR_BAD_DEPTH = `functionish/lib/LazyList.flat:The depth is negative or not a number.`;
const ERR_BAD_FILTERPREDICATE = `functionish/lib/LazyList.filter: The predicate has type %s. Expected a function.`;
const ERR_BAD_FLATMAP_DEPTH = `functionish/lib/LazyList.flatMap:The depth is negative or not a number.`;
const ERR_BAD_FLATMAP_MAPFUNCTION = `functionish/lib/LazyList.flatMap: The map function has type %s. Expected a function.`;
const ERR_BAD_MAPFUNCTION = `functionish/lib/LazyList.map: The map function has type %s. Expected a function.`;
const ERR_BAD_SORTFUNCTION = `functionish/lib/LazyList.sort: The compare function has type %s. Expected a function.`;
const ERR_BAD_SOURCE = 'functionish/lib/LazyList.from: The argument is neither interable nor a function.';
const ERR_INSTANTIATIONERROR = 'functionish/lib/LazyList: The LazyList class cannot be instantiated directly.';

const format = require('util').format;

const isempty = array => (array.length === 0);
const maximumvalue = Math.max;
const notstring = x => (typeof x !== 'string');
const truncate = Math.trunc;

const casttopositiveinteger = x => maximumvalue(0, truncate( +x || 0 ));

const defer = (func, args=[]) => isempty(args) ? func : () => func(...args);
const getiterator = iterable => iterable[Symbol.iterator]();
const isconstructorlock = lock => (lock === CONSTRUCTORLOCK);
const isfunction = func => (typeof func === 'function');
const isiterable = obj => isfunction(obj?.[Symbol.iterator]);
const isiterablenotstring = obj => notstring(obj) && isfunction(obj?.[Symbol.iterator]);
const isflattenable = obj => notstring(obj) && isfunction(obj?.[Symbol.iterator]);
const ispositiveinteger = num => (Number.isSafeInteger(num) && (num >= 0));
const newlazylist = (func, ...args) => ( new LazyList( defer(func, args), CONSTRUCTORLOCK) );
const raisebaddepth = () => { throw new TypeError(ERR_BAD_DEPTH) }
const raisebadfilterpredicate = predicate => { throw new TypeError( format(ERR_BAD_FILTERPREDICATE, typeof predicate) ) }
const raisebadflatMapdepth = () => { throw new TypeError(ERR_BAD_FLATMAP_DEPTH) }
const raisebadflatMapmapfunction = mapfunc => { throw new TypeError( format(ERR_BAD_FLATMAP_MAPFUNCTION, typeof mapfunc) ) }
const raisebadmapfunction = mapfunc => { throw new TypeError( format(ERR_BAD_MAPFUNCTION, typeof mapfunc) ) }
const raisebadsortfunction = comparefunc => { throw new TypeError( format(ERR_BAD_SORTFUNCTION, typeof comparefunc) ) }
const raisebadsourceerror = source => { throw new TypeError( format(ERR_BAD_SOURCE, typeof source)) }
const raiseconstructorlockerror = () => { throw new Error(ERR_INSTANTIATIONERROR) }

class LazyList {

    static from = (source, ...args) => isfunction(source) && newlazylist(source, ...args)
                                    || islazylist(source) && source
                                    || isiterable(source) && newlazylist(getiterator, source)
                                    || raisebadsourceerror(source);

    static is = islazylist;

    constructor(iteratorfunc, lock) {

        isconstructorlock(lock) || raiseconstructorlockerror();

        this[Symbol.iterator] = iteratorfunc;
    }

    concat(...items) {
        return isempty(items) && this || newlazylist(listconcat, this, items);
    }

    filter(predicate) {

        return isfunction(predicate) && newlazylist(listfilter, predicate, this)
                ||
               raisebadfilterpredicate(predicate);
    }

    flat(depth=1) {

        return ispositiveinteger(depth) && newlazylist(listflat, depth, this)
                ||
               raisebaddepth();
    }

    flatMap(mapfunc, depth=1) {

        return isfunction(mapfunc) && ispositiveinteger(depth) && newlazylist(listflatMap, depth, mapfunc, this)
                ||
               (isfunction(mapfunc) && raisebadflatMapdepth())
                ||
               raisebadflatMapmapfunction(mapfunc);
    }

    map(mapfunc) {

        return isfunction(mapfunc) && newlazylist(listmap, mapfunc, this)
                ||
               raisebadmapfunction(mapfunc);
    }

    reverse() {
        return newlazylist(listreverse, this);
    }

    slice(start=0, end=Infinity) {

        return (end === Infinity) ? newlazylist(listslicepartial, this, casttopositiveinteger(start))
                                  : newlazylist(listslicerange, this, casttopositiveinteger(start), casttopositiveinteger(end));
    }

    sort(comparefunc) {

        return isempty(arguments) && newlazylist(listsort, this)
                ||
               (isfunction(comparefunc) && newlazylist(listsortcustom, comparefunc, this))
                ||
               raisebadsortfunction(comparefunc);
    }

    [Symbol.iterator]
}

function islazylist(list) {
    return (list instanceof LazyList);
}

function* listconcat(baselist, items) {

    yield* baselist;

    for(const item of items) isiterablenotstring(item) ? yield* item
                                                       : yield item;
}

function* listfilter(predicate, list) {
    for(const item of list) predicate(item) && (yield item);
}

function* listflat(depth, list) {

    if(depth) for(const item of list) isflattenable(item) ? yield* listflat(depth-1, item) : yield item;
    else yield* list;
}

function* listflatMap(depth, mapfunc, list) {

    if(depth === 0) {

        yield* listmap(mapfunc, list);

    } else {

        for(const item of list) {
            
            const mappeditem = mapfunc(item);

            isflattenable(mappeditem) ? yield* listflatMap(depth-1, mappeditem)
                                      : yield mappeditem;
        }
    }
}

function* listmap(mapfunc, list) {
    for(const item of list) yield mapfunc(item);
}

function* listreverse(list) {

    const array = Array.from(list);

    for(let i=array.length-1; i >= 0; i -= 1) yield array[i];
}

function* listslicepartial(list, start) {

    const iterator = getiterator(list);

    positioniterator(start, iterator);

    yield* iterator;
}

function* listslicerange(list, start, end) {

    const iterator = getiterator(list);

    positioniterator(start, iterator);

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

function* listsort(list) {
    yield* Array.from(list).sort();
}

function* listsortcustom(comparefunc, list) {
    yield* Array.from(list).sort(comparefunc);
}

function positioniterator(targetindex, iterator) {
    if(targetindex > 0) while(targetindex-- && !iterator.next().done);
}

module.exports = LazyList;