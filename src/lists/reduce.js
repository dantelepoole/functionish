/**
 * @module lists/reduce
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduce(): The source list has type %s. Expected an iterable object.`;
const SYMBOL_AUTOREDUCE = `functionish/lists/reduce/autoreduce/tag`;

const AUTO_PROPERTYDESCRIPTOR = Object.freeze({
    configurable: false,
    enumerable  : true,
    value       : SYMBOL_AUTOREDUCE,
    writable    : false
})

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

const setautotag = reduce => Object.defineProperty(reduce, 'Auto', AUTO_PROPERTYDESCRIPTOR);
const getiterator = iterable => iterable[Symbol.iterator]();
const isautoreduce = x => (x === SYMBOL_AUTOREDUCE);
const raisebadsourcelisterror = compose(raise, error.Type(ERR_BAD_SOURCELIST), typeorclassname);

/**
 * Function variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}. If *sourcelist* has a `reduce()`
 * method, call with the *reducer* function and the *initialvalue* and return the result. Otherwise, iterate over
 * *sourcelist* and call the *reducer* with each item and the previous call's return value (or, on the first call, the
 * *initialvalue*) and return the result.
 * 
 * If the *reducer* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * If the *initialvalue* is set to the `reduce.Auto` property, `reduce()` will use *sourcelist*'s first item as the
 * initial value and start iteration with *sourcelist*'s second item. If *sourcelist* is empty, `undefined` is returned.
 * If *sourcelist* contains a single item, that item is returned. Note that this behavior deviates from
 * {@link external:Array.prototype.reduce Array.prototype.reduce()}.
 * 
 * `reduce()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `reduce()`</caption>
 * 
 * const { reduce } = require('functionish/lists');
 * 
 * const sum = (a,b) => (a+b);
 * 
 * reduce(sum, 0, [1,2,4]); // returns 7
 * reduce(sum, 0, [42]); // returns 42
 * reduce(sum, 0, []); // returns 0
 * 
 * @function reduce
 * @see {@link external:Array.prototype.reduce Array.prototype.reduce()}
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} sourcelist An iterable object
 * @returns {any} The reduced value
 */
function reduce(reducer, initialvalue, sourcelist) {

    isfunction(reducer) || (reducer = resolve(reducer));

    switch(arguments.length) {
        case 1: return _reduce.bind(null, reducer);
        case 2: return _reduce.bind(null, reducer, initialvalue)
        default: return _reduce(reducer, initialvalue, sourcelist);
    }
}

function _reduce(reducer, initialvalue, sourcelist) {

    return isautoreduce(initialvalue) ? autoreduce(reducer, sourcelist)
         : isfunction(sourcelist?.reduce) ? sourcelist.reduce(reducer, initialvalue)
         : isiterable(sourcelist) ? reducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function reducelist(reducer, initialvalue, sourcelist) {

    let accumulator = initialvalue;

    for(const item of sourcelist) accumulator = reducer(accumulator, item);

    return accumulator;
}

function autoreduce(reducer, sourcelist) {

    isiterable(sourcelist) || raisebadsourcelisterror(sourcelist);

    const iterator = getiterator(sourcelist);

    let result = getfirstiteratorvalue(iterator);

    for(const item of iterator) result = reducer(result, item);

    return result;
}

function getfirstiteratorvalue(iterator) {

    let result = undefined;
    const itemobject = iterator.next();

    itemobject.done || (result = itemobject.value);

    return result;
}

module.exports = setautotag(reduce);
