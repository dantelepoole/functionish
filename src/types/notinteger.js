/**
 * @module types/notinteger
 */

'use strict';

const isinteger = Number.isSafeInteger;

/**
 * Return `true` if *value* is not a safe Javascript integer number. Otherwise, return `false`.
 * 
 * @example
 * const isinteger = require('functionish/types/isinteger');
 * 
 * notinteger(42); // returns false
 * notinteger(42.0); // returns false
 * notinteger(Number.MAX_SAFE_INTEGER); // returns false
 * notinteger(Number.MIN_SAFE_INTEGER); // returns false
 * 
 * notinteger(42.42); // returns true
 * notinteger('42'); // returns true
 * notinteger(Number.MAX_SAFE_INTEGER + 1); // returns true
 * notinteger(Number.MIN_SAFE_INTEGER - 1); // returns true
 * 
 * @func notinteger
 * @see {@link external:Number.isSafeInteger Number.isSafeInteger()}
 * @see {@link module:types/isinteger isinteger()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notinteger(x) {
    return ! isinteger(x);
}