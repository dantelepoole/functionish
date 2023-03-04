/**
 * @module math/constrain
 */

'use strict';

const curry = require('../curry');
const isvoid = require('../types/isvoid');

/**
 * Return *value* if itlies between *lowerlimit* and *upperlimit* (both inclusive). Otherwise, return
 * the limit closest to *value*.
 * 
 * If *value* is `null`, `undefined` or `NaN`, *lowerlimit* is returned.
 * 
 * @example
 * const constrain = require('functionish/math/constrain');
 * 
 * constrain(0, 10, 5); // returns 5
 * constrain(0, 10, -1); // returns 0
 * constrain(0, 10, 42); // returns 10
 * 
 * constrain(1, 10, null); // returns 0
 * constrain(1, 10, undefined); // returns 0
 * constrain(1, 10, NaN); // returns 0
 * 
 * @function constrain
 * @param {number} lowerlimit The lower limit for *value* (inclusive)
 * @param {number} upperlimit The upper limit for *value* (inclusive)
 * @param {number} value The value to check
 * @returns {number}
 */
function constrain(lowerlimit, upperlimit, value) {

    return isvoid(value) ? lowerlimit
         : (lowerlimit > value) ? lowerlimit
         : (upperlimit < value) ? upperlimit
         : value;
}

module.exports = curry(2, constrain);