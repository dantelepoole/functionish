/**
 * @module math/isatmost
 */

'use strict';

const curry1 = require('../curry1');

/**
 * Return `true` if *b* is less than or equal to *a*. Otherwise, return `false`.
 * 
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `isatmost()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `isatmost()`</caption>
 * 
 * const { isatmost } = require('functionish');
 * 
 * isatmost(1, 1); // returns true;
 * isatmost(1, 42); // returns false;
 * isatmost(1, 0); // returns true;
 * 
 * @function isatmost
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
const isatmost = curry1(function isatmost(a,b) {
    return (b <= a)
});

module.exports = isatmost;