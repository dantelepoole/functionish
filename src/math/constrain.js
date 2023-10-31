/**
 * @module math/constrain
 */

'use strict';

const curry = require('../curry');

/**
 * Return *value* if it lies between *lowerbound* and *upperbound* (both inclusive). Otherwise, return
 * the limit closest to *value*. 
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
    
    return (value < lowerbound) ? lowerbound
         : (value > upperbound) ? upperbound
         : value;
}

module.exports = curry(2, constrain);