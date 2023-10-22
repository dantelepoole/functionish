/**
 * @module types/isvoid
 */

'use strict';

const VOID_MARKER = Symbol();

/**
 * Return `true` if *value* is <abbr title="null, undefined or NaN">void</abbr>, i.e. `null`, `undefined` or `NaN`.
 * Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `isvoid()`</caption>
 * 
 * const { isvoid } = require('functionish/types');
 * 
 * isvoid(undefined); // returns true
 * isvoid(null); // returns true
 * isvoid(NaN); // returns true
 * 
 * isvoid(42); // returns false
 * 
 * @function isvoid
 * @see {@link module:types/isdefined isdefined()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isvoid(value) {
    return (value ?? VOID_MARKER) !== value;
}

module.exports = isvoid;