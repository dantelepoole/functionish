/**
 * @module isdefined
 */

'use strict';

/**
 * Return `true` if value is neither `null` nor `undefined`, otherwise return `false`.
 * 
 * Despite its name, this function checks for `null` as well as `undefined`. So it is not the counterpart
 * to {@link module:isundefined isundefined()} (which only checks for `undefined`) but in fact the counterpart to
 * {@link module:isvoid isvoid()}.
 * 
 * @func isdefined
 * @see {@link module:isvoid isvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isdefined(value) {
    return (value !== null && value !== undefined);
}