/**
 * @module types/isinteger
 */

'use strict';

/**
 * Return `true` if *value* is a safe Javascript integer number. Otherwise, return `false`.
 * 
 * @example
 * const isinteger = require('functionish/types/isinteger');
 * 
 * isinteger(42); // returns true
 * isinteger(42.0); // returns true
 * isinteger(Number.MAX_SAFE_INTEGER); // returns true
 * isinteger(Number.MIN_SAFE_INTEGER); // returns true
 * 
 * isinteger(42.42); // returns false
 * isinteger('42'); // returns false
 * isinteger(Number.MAX_SAFE_INTEGER + 1); // returns false
 * isinteger(Number.MIN_SAFE_INTEGER - 1); // returns false
 * 
 * @function isinteger
 * @see {@link external:Number.isSafeInteger Number.isSafeInteger()}
 * @see {@link module:types/notinteger notinteger()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = Number.isSafeInteger;