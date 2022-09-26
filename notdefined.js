/**
 * @module notdefined
 */

'use strict';

const isvoid = require('./isvoid');

/**
 * Return `true` if value is `null`, `undefined` nor `NaN`, otherwise return `false`.
 * 
 * Despite its name, this function checks for `null` and `NaN` as well as `undefined`. So it is not the counterpart
 * to {@link module:notundefined notundefined()} (which only checks for `undefined`) but in fact the counterpart to
 * {@link module:notvoid notvoid()}.
 * 
 * @func isdefined
 * @see {@link module:notvoid notvoid()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notdefined(value) {
    return isvoid(value);
}