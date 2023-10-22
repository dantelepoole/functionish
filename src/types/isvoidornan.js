/**
 * @module types/isvoidornan
 */

'use strict';

const VOID_MARKER = Symbol();

/**
 * to do
 * 
 * @example <caption>Example usage of `isvoidornan()`</caption>
 * 
 * const { isvoidornan } = require('functionish/types');
 * 
 * isvoidornan(undefined); // returns true
 * isvoidornan(null); // returns true
 * isvoidornan(NaN); // returns true
 * 
 * isvoidornan(42); // returns false
 * 
 * @function isvoidornan
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isvoidornan(value) {
    return (value ?? VOID_MARKER) !== value;
}

module.exports = isvoidornan;