/**
 * @module math/product
 */

'use strict';

const reduce = require('../lists/reduce');

const multiply = (a,b) => (a*b);
const calculateproduct = reduce.bootstrap(multiply);

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
function product(factors) {
    return calculateproduct(factors) ?? 0;
}

module.exports = product;