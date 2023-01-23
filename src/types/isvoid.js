/**
 * @module types/isvoid
 */

'use strict';

const VOID_MARKER = Symbol();

/**
 * Return `true` if *value* is <abbr title="null, undefined or NaN">void</abbr>, i.e. `null`, `undefined` or `NaN`.
 * Otherwise, return `false`.
 * 
 * This function does the same as {@link module:types/notdefined notdefined()}.
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
 * @see {@link module:types/notdefined notdefined()}
 * @see {@link module:types/notvoid notvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isvoid(value) {
    return (value ?? VOID_MARKER) !== value;
}

module.exports = isvoid;