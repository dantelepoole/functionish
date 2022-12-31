/**
 * @module math/product
 */

'use strict';

const multiply = (a,b) => (a*b);

const multiplyall = (...factors) => factors.length ? factors.reduce(multiply, 1) : 0;

/**
 * Return the product of the values in the *factors* list.
 * 
 * @example
 * const product = require('functionish/math/product');
 * 
 * product(14, 1, 3); // returns 42
 * 
 * @function product 
 * @param {iterable} factors The list of values to multiply
 * @returns {number}
 */
module.exports = function product(factors) {
    return multiplyall(...factors);
}