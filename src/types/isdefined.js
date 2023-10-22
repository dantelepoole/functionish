/**
 * @module types/isdefined
 */

'use strict';

const VOID = Symbol();

/**
 * Return `true` if value is not <abbr title="null, undefined or NaN">void</abbr>. Otherwise, return `false`.
 * 
 * Despite its name, this function checks for `null` and `NaN` as well as `undefined`. So it is not the counterpart
 * to {@link module:types/isundefined isundefined()} (which only checks for `undefined`) but in fact the counterpart to
 * {@link module:types/isvoid isvoid()}.
 * 
 * @example <caption>Example usage of `isdefined()`</caption>
 * 
 * const { isdefined } = require('functionish/types');
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
function isdefined(value) {
    return (value ?? VOID) === value;
}

module.exports = isdefined;