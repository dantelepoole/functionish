/**
 * @module math/ismorethan
 */

'use strict';

const curry1 = require('../curry1');

/**
 * Return `true` if *b* is greater than *a*. Otherwise, return `false`.
 *
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `ismorethan()` is curried by default with unary arity.
 *  
 * @example <caption>Example usage of `ismorethan()`</caption>
 * 
 * const { ismorethan } = require('functionish/math');
 * 
 * ismorethan(42, 1); // returns false;
 * ismorethan(0, 1); // returns true;
 * 
 * @function ismorethan
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
const ismorethan = curry1(function ismorethan(a,b) {
    return (b > a)
});

module.exports = ismorethan;