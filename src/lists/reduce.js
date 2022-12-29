/**
 * @module lists/reduce
 */

'use strict';

const isfunction = require('./isfunction');
const resolvefunction = require('../resolvefunction');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}. Reduces the
 * values in *list* starting with the *initialvalue* and using the *reducer* function.
 * 
 * @example
 * 
 * const reduce = require('functionish/lists/reduce');
 * const range = require('functionish/misc/range');
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduce(sum, 0, [1,2,3]); // returns 6
 * reduce(sum, 0, range(3)); //returns 6
 * 
 * @func reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */

module.exports = function reduce(reducer, initialvalue, list) {

    isfunction(reducer) || (reducer = resolvefunction(reducer));
    
    let result = initialvalue;

    for(const value of list) result = reducer(result, value);

    return result;
}