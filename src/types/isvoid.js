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
 * @example
 * const isvoid = require('functionish/types/isvoid');
 * 
 * isvoid(undefined); // returns true
 * isvoid(null); // returns true
 * isvoid(NaN); // returns true
 * 
 * isvoid(42); // returns false
 * 
 * @function isvoid
 * @see {@link module:types/notdefined notdefined()}
 * @see {@link module:types/notvoid notvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isvoid(value) {
    return (value ?? VOID_MARKER) !== value;
}