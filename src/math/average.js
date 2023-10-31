/**
 * @module math/average
 */

'use strict';

/**
 * Return the average of the values in the *values* list.
 * 
 * @example
 * const average = require('functionish/math/average');
 * 
 * average( [0, 41, 43, 84] ); // returns 42
 * 
 * @function average
 * @param {iterable} values The list of values to average
 * @returns {number}
 */
function average(values) {

    let total = 0;
    let count = 0;

    for(const value of values) {
        total += value;
        count += 1
    }

    return (count > 0) ? (total/count) : 0;
}

module.exports = average;