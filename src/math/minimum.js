/**
 * @module math/minimum
 */

'use strict';

/**
 * Return the lowest value in the *values* list or `Infinity` if the *values* list is empty.
 * 
 * This function is an alias for {@link external:Math.min Math.min()}.
 * 
 * @example
 * const minimum = require('functionish/math/minimum');
 * 
 * minimum( [100, 150, 42, 366] ); // returns 42
 * minimum(); // returns Infinity
 * 
 * @function minimum
 * {@link external:Math.min Math.min()}
 * @param {iterable} values The list of values to check.
 * @returns {number}
 */
function minimum(values) {
    return Math.min(...values);
}

module.exports = minimum;