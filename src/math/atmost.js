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
 * @param {number} upperbound The upper limit for *value* (inclusive)
 * @param {number} value The value to check
 * @returns {number}
 */
function atmost(upperbound, value) {
    return (upperbound > value) ? value : upperbound;
}

module.exports = curry(1, atmost);