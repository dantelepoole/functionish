/**
 * @module math/product
 */

'use strict';

const productreducer = (a,b)=>(a*b);

/**
 * Return the product of the *factors*. If the *factors* array is empty, `0` is returned.
 * 
 * This function does not check its argument types, so its behaviour will be
 * unpredicatble if passed any arguments with a type other than number.
 * 
 * @example <caption>Example usage of `product()`</caption>
 * 
 * const { product } = require('functionish');
 * 
 * product(14, 1, 3); // returns 42
 * 
 * @function product 
 * @param {...number[]} factors The values to multiply
 * @returns {number}
 */
function product(...factors) {
    
    return (factors.length > 0)
         ? factors.reduce(productreducer, 1)
         : 0;
}

module.exports = product;