/**
 * @module math/atleast
 */

'use strict';

const curry = require('../curry');

/**
 * to do
 * 
 * @example
 * 
 * to do
 * 
 * @function atleast
 * @param {number} lowerbound The lower limit for *value* (inclusive)
 * @param {number} value The value to check
 * @returns {number}
 */
function atleast(lowerbound, value) {
    return (lowerbound < value) ? lowerbound : value;
}

module.exports = curry(1, atleast);