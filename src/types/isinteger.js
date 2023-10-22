/**
 * @module types/isinteger
 */

'use strict';

/**
 * Alias for {@link external:Number#isSafeInteger Number.isSafeInteger()}.
 * 
 * Return `true` if *value* is a safe Javascript integer number. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `isinteger()`</caption>
 * 
 * const { isinteger } = require('functionish/types');
 * 
 * isinteger(42); // returns true
 * isinteger(42.0); // returns true
 * 
 * isinteger(42.42); // returns false
 * isinteger('42'); // returns false
 * 
 * @function isinteger
 * @see {@link external:Number.isSafeInteger Number.isSafeInteger()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = Number.isSafeInteger;