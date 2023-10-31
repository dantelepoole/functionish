/**
 * @module math/minimum
 */

'use strict';

/**
 * Return the lowest value in the *values* list or `NaN` if the *values* list is empty.
 * 
 * [to do: edit doc for null, undefined or NaN values]
 * 
 * @example
 * const minimum = require('functionish/math/minimum');
 * 
 * minimum( [100, 150, 42, 366] ); // returns 42
 * minimum(); // returns NaN
 * 
 * @function minimum
 * {@link external:Math.min Math.min()}
 * @param {iterable} values The list of values to check.
 * @returns {number}
 */
module.exports = Math.min;