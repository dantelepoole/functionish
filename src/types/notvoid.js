/**
 * @module types/notvoid
 */

'use strict';

const VOID_MARKER = Symbol();

/**
 * Return `true` if *value* is not <abbr title="null, undefined or NaN">void</abbr>, i.e. neither `null`, `undefined` or `NaN`.
 * Otherwise, return `false`.
 * 
 * This function does the same as {@link module:types/isdefined isdefined()}.
 * 
 * @example
 * const notvoid = require('functionish/types/notvoid');
 * 
 * notvoid(undefined); // returns false
 * notvoid(null); // returns false
 * notvoid(NaN); // returns false
 * 
 * notvoid(42); // returns true
 * 
 * @func notvoid
 * @see {@link module:types/isdefined isdefined()}
 * @see {@link module:types/isvoid isvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notvoid(value) {
    return (value ?? VOID_MARKER) === value;
}