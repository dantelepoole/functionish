/**
 * @module lists/reduce
 */

'use strict';

const curry3 = require('../curry3');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}. Reduces the
 * values in *list* starting with the *initialvalue* and using the *reducer* function.
 * 
 * `reduce()` is curried by default with ternary arity.
 * 
 * @example <caption>Example usage of `reduce()`</caption>
 * 
 * const { reduce } = require('functionish/lists');
 * 
 * const add = (a,b) => (a+b);
 * 
 * reduce(add, 0, [1,2,3]); // returns 6
 * 
 * @function reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */
function reduce(reducer, initialvalue, list) {

    let result = initialvalue;

    for(const value of list) result = reducer(result, value);

    return result;
}

module.exports = curry3(reduce);