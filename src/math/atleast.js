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
 * @param {number} lowerlimit The lower limit for *value* (inclusive)
 * @param {number} value The value to check
 * @returns {number}
 */
function atleast(lowerlimit, value) {
    return ( !(lowerlimit <= value) ) ? lowerlimit : value;
}

module.exports = curry(1, atleast);