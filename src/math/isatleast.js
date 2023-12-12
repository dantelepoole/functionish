/**
 * @module math/isatleast
 */

'use strict';

const curry1 = require('../curry1');

/**
 * Return `true` if *b* is greater than or equal to *a*. Otherwise, return `false`.
 * 
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `isatleast()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `isatleast()`</caption>
 * 
 * const { isatleast } = require('functionish/math');
 * 
 * isatleast(1, 1); // returns true;
 * isatleast(1, 42); // returns true;
 * isatleast(1, 0); // returns false;
 * 
 * @function isatleast
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
const isatleast = curry1(function isatleast(a,b) {
    return (b >= a)
});

module.exports = isatleast;