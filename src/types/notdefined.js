/**
 * @module types/notdefined
 */

'use strict';

const VOID = Symbol();

/**
 * Return `true` if value is `null`, `undefined` or `NaN`, otherwise return `false`.
 * 
 * Despite its name, this function checks for `null` and `NaN` as well as `undefined`. So it is not the counterpart
 * to {@link module:notundefined notundefined()} (which only checks for `undefined`) but in fact the counterpart to
 * {@link module:notvoid notvoid()}.
 * 
 * @func notdefined
 * @see {@link module:notvoid notvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notdefined(value) {
    return (value ?? VOID) !== value;
}