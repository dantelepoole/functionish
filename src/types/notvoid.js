/**
 * @module types/notvoid
 */

'use strict';

const VOID_MARKER = Symbol();

/**
 * Return `true` if *value* is neither `null`, `undefined` or `NaN`. Otherwise, return `false`.
 * 
 * This function does the same as {@link module:types/isdefined isdefined()}.
 * 
 * @func notvoid
 * @see {@link module:types/isdefined isdefined()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notvoid(value) {
    return (value ?? VOID_MARKER) === value;
}