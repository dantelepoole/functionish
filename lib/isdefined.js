'use strict';

const notnan = value => ! Number.isNaN(value);

/**
 * Return `true` if value is neither `null`, `undefined` nor `NaN`, otherwise return `false`.
 * 
 * Despite its name, this function checks for `null` and `NaN` as well as for `undefined`. So it is not the counterpart
 * to {@link module:lib/isundefined isundefined()} (which only checks for `undefined`) but in fact the counterpart for
 * {@link module:lib/isvoid isvoid()}.
 * 
 * @module lib/isdefined
 * @ignore
 * @see {@link module:lib/isvoid isvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isdefined(value) {

    return (value !== undefined)
            && (value !== null)
            && (typeof value !== 'number' || notnan(value));
}