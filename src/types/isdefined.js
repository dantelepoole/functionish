/**
 * @module types/isdefined
 */

'use strict';

const VOID = Symbol();

/**
 * Return `true` if value is neither `null`, `undefined` nor `NaN`, otherwise return `false`.
 * 
 * Despite its name, this function checks for `null` as well as `undefined`. So it is not the counterpart
 * to {@link module:types/isundefined isundefined()} (which only checks for `undefined`) but in fact the counterpart to
 * {@link module:types/isvoid isvoid()}.
 * 
 * @example
 * const isdefined = require('functionish/types/isdefined');
 * 
 * isdefined(42); // returns true
 * isdefined(''); // returns true
 * isdefined([]); // returns true
 * 
 * isdefined(undefined); // returns false
 * isdefined(null); // returns false
 * isdefined(NaN); // returns false
 * 
 * @function isdefined
 * @see {@link module:types/isvoid isvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isdefined(value) {
    return (value ?? VOID) === value;
}