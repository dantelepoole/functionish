/**
 * @module notvoid
 */

'use strict';

const UNIQUE_SYMBOL = Symbol();

/**
 * Return `true` if *value* is neither `null`, `undefined` or `NaN`, otherwise return `false`.
 * 
 * This function does the same as {@link module:isdefined isdefined()}.
 * 
 * @func notvoid
 * @see {@link module:isdefined isdefined()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notvoid(value) {
    return (value ?? UNIQUE_SYMBOL) === value;
}