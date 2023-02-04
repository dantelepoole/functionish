/**
 * @module lists/reduceright
 */

'use strict';

const curry3 = require('../curry3')
const isarray = require('../types/isarray');

/**
 * Functional variant of {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}. Reduces the
 * values in *list* in reverse order, starting with the *initialvalue* and using the *reducer* function.
 * 
 * `reduceright()` is curried by default with ternary arity.
 * 
 * @example <caption>Example usage of `reduceright()`</caption>
 * 
 * const { reduceright } = require('functionish/lists');
 * 
 * const add = (a,b) => (a+b);
 * 
 * reduceright(sum, 0, [1,2,3]); // returns 6
 * 
 * @function reduceright
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */
function reduceright(reducer, initialvalue, list) {

    isarray(list) || (list = [...list]);

    return list.reduceRight(reducer, initialvalue);
}

module.exports = curry3(reduceright);