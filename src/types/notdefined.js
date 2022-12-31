/**
 * @module types/notdefined
 */

'use strict';

const VOID = Symbol();

/**
 * Return `true` if value is either `null`, `undefined` or `NaN`, otherwise return `false`.
 * 
 * Despite its name, this function checks for `null` and `NaN` as well as `undefined`. So it is not the counterpart
 * to {@link module:types/notundefined notundefined()} (which only checks for `undefined`) but in fact the counterpart
 * to {@link module:types/notvoid notvoid()}.
 * 
 * @example
 * const notdefined = require('functionish/types/notdefined');
 * 
 * notdefined(42); // returns false
 * notdefined(''); // returns false
 * notdefined([]); // returns false
 * 
 * notdefined(undefined); // returns true
 * notdefined(null); // returns true
 * notdefined(NaN); // returns true
 * 
 * @func notdefined
 * @see {@link module:types/notvoid notvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notdefined(value) {
    return (value ?? VOID) !== value;
}