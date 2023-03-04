/**
 * @module math/sum
 */

'use strict';

/**
 * Return the sum of the values in the *values* list.
 * 
 * @example
 * const sum = require('functionish/math/sum');
 * 
 * sum(30, 10, 2); // returns 42
 * 
 * @function sum 
 * @param {iterable} factors The list of values to sum
 * @returns {number}
 */
function sum(values) {
    
    let total = 0;

    for(const value of values) total += value;

    return total;
}

module.exports = sum;