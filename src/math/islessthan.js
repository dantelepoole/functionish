/**
 * @module math/islessthan
 */

'use strict';

const curry1 = require('../curry1');

/**
 * Return `true` if *b* is less than *a*. Otherwise, return `false`.
 *
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `islessthan()` is curried by default with unary arity.
 *  
 * @example <caption>Example usage of `isbetween()`</caption>
 * 
 * const { islessthan } = require('functionish');
 * 
 * islessthan(42, 1); // returns true;
 * islessthan(0, 1); // returns true;
 * 
 * @function islessthan
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
const islessthan = curry1(function islessthan(a,b) {
    return (b < a)
});

module.exports = islessthan;