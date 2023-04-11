/**
 * @module math/constrain
 */

'use strict';

const curry = require('../curry');
const isvoid = require('../types/isvoid');

/**
 * Return *value* if it lies between *lowerlimit* and *upperlimit* (both inclusive). Otherwise, return
 * the limit closest to *value*. If value
 * 
 * If *value* is `null`, `undefined` or `NaN`, `NaN` is returned.
 * 
 * @example
 * const constrain = require('functionish/math/constrain');
 * 
 * constrain(0, 10, 5); // returns 5
 * constrain(0, 10, -1); // returns 0
 * constrain(0, 10, 42); // returns 10
 * 
 * constrain(1, 10, null); // returns NaN
 * constrain(1, 10, undefined); // returns NaN
 * constrain(1, 10, NaN); // returns NaN
 * 
 * @function constrain
 * @param {number} lowerbound The lower limit for *value* (inclusive)
 * @param {number} upperbound The upper limit for *value* (inclusive)
 * @param {number} value The value to check
 * @returns {number}
 */
function constrain(lowerbound, upperbound, value) {

    return isvoid(value) ? NaN
         : (lowerbound > value) ? lowerbound
         : (upperbound < value) ? upperbound
         : value;
}

module.exports = curry(2, constrain);