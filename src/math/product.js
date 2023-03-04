/**
 * @module math/product
 */

'use strict';

const FACTOR_NONE = undefined;

const reduce = require('../lists/reduce');

const productreducer = (product, factor) => (product ?? 1) * factor;
const multiply = reduce(productreducer, FACTOR_NONE);

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
    return multiply(factors);
}

module.exports = product;