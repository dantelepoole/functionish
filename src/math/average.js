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
module.exports = function average(values) {

    let total = 0;
    let count = 0;

    for(const number of values) (total += number, count += 1);

    return (total === 0) ? 0 : (total/count);
}