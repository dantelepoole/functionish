/**
 * @module math/maximum
 */

'use strict';

/**
 * Return the highest value in the *values* list or `-Infinity` if the *values* list is empty.
 * 
 * This function is an alias for {@link external:Math.max Math.max()}.
 * 
 * @example
 * const maximum = require('functionish/math/maximum');
 * 
 * maximum( [0, 15, 42, 36] ); // returns 42
 * maximum(); // returns -Infinity
 * 
 * @function maximum
 * @see {@link external:Math.max Math.max()}
 * @param {iterable} values The list of values to check.
 * @returns {number}
 */
module.exports = function maximum(values) {
    return Math.max(...values);
}