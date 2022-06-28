/**
 * @module notvoid
 */

'use strict';

/**
 * Return `true` if *value* is neither `null` nor `undefined`, otherwise return `false`.
 * 
 * This function does the same as {@link module:isdefined isdefined()}.
 * 
 * @func notvoid
 * @see {@link module:isdefined isdefined()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notvoid(value) {
    return (value !== null) && (value !== undefined);
}