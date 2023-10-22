/**
 * @module types/isvoid
 */

'use strict';

/**
 * to do
 * 
 * @example <caption>Example usage of `isvoid()`</caption>
 * 
 * const { isvoid } = require('functionish/types');
 * 
 * isvoid(undefined); // returns true
 * isvoid(null); // returns true
 * isvoid(NaN); // returns false
 * 
 * isvoid(42); // returns false
 * 
 * @function isvoid
 * @see {@link module:types/isdefined isdefined()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isvoid(value) {
    return (value === null || value === undefined);
}

module.exports = isvoid;