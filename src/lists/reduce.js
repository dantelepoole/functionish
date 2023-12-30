/**
 * @module lists/reduce
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduce(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

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

    const arity = arguments.length;

    return (arity === 1) ? reduce.bind(null, reducer)
         : (arity === 2) ? reduce.bind(null, reducer, initialvalue)
         : isfunction(sourcelist?.reduce) ? sourcelist.reduce(reducer, initialvalue)
         : isiterable(sourcelist) ? reducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function reducelist(reducer, initialvalue, list) {

    let accumulator = initialvalue;

    for(const item of list) accumulator = reducer(accumulator, item);

    return accumulator;
}

module.exports = reduce;
