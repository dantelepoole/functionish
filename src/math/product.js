/**
 * @module math/product
 */

'use strict';

const multiply = (a,b) => (a*b);

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
    
    let total = 1;
    let havefactor = false;

    for(const factor of factors) {

        havefactor || (havefactor = true);

        total *= factor;
    }

    return havefactor ? total : 0;
}

module.exports = product;