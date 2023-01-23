/**
 * @module types/notinteger
 */

'use strict';

const isinteger = Number.isSafeInteger;

/**
 * Return `true` if *value* is not a safe Javascript integer number. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `notinteger()`</caption>
 * 
 * const { isinteger } = require('functionish/types');
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
 * @function notinteger
 * @see {@link external:Number.isSafeInteger Number.isSafeInteger()}
 * @see {@link module:types/isinteger isinteger()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notinteger(x) {
    return ! isinteger(x);
}

module.exports = notinteger;