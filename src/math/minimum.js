/**
 * @module math/minimum
 */

'use strict';

const isnumberornan = require('../types/isnumberornan');

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
function minimum(values) {

    let minvalue = NaN;

    for(const value of values) (minvalue <= value) || (minvalue = value);

    return isnumberornan(minvalue) ? minvalue : NaN;
}

module.exports = minimum;