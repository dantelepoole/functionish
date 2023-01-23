/**
 * @module types/notdefined
 */

'use strict';

const VOID = Symbol();

/**
 * Return `true` if value is <abbr title="null, undefined or NaN">void</abbr>.
 * Otherwise, return `false`.
 * 
 * Despite its name, this function checks for `null` and `NaN` as well as `undefined`. So it is not the counterpart
 * to {@link module:types/notundefined notundefined()} (which only checks for `undefined`) but in fact the counterpart
 * to {@link module:types/notvoid notvoid()}.
 * 
 * @example <caption>Example usage of `notdefined()`</caption>
 * 
 * const { notdefined } = require('functionish/types');
 * 
 * notdefined(42); // returns false
 * notdefined(''); // returns false
 * notdefined([]); // returns false
 * 
 * notdefined(undefined); // returns true
 * notdefined(null); // returns true
 * notdefined(NaN); // returns true
 * 
 * @function notdefined
 * @see {@link module:types/isdefined isdefined()}
 * @see {@link module:types/notvoid notvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notdefined(value) {
    return (value ?? VOID) !== value;
}

module.exports = notdefined;