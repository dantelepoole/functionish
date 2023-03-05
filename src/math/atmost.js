/**
 * @module math/atmost
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
 * @function atmost
 * @param {number} upperlimit The upper limit for *value* (inclusive)
 * @param {number} value The value to check
 * @returns {number}
 */
function atmost(upperlimit, value) {
    return ( !(upperlimit >= value) ) ? upperlimit : value;
}

module.exports = curry(1, atmost);