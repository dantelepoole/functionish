/**
 * @module math/maximum
 */

'use strict';

const isnumberornan = require('../types/isnumberornan');

/**
 * Return the highest value in the *values* list or `undefined` if the *values* list is empty.
 * 
 * [to do: edit doc for null, undefined or NaN values]
 * 
 * @example
 * const maximum = require('functionish/math/maximum');
 * 
 * maximum( [0, 15, 42, 36] ); // returns 42
 * maximum(); // returns NaN
 * 
 * @function maximum
 * @see {@link external:Math.max Math.max()}
 * @param {iterable} values The list of values to check.
 * @returns {number}
 */
function maximum(values) {

    let maxvalue = NaN;

    for(const value of values) (maxvalue >= value) || (maxvalue = value);

    return isnumberornan(maxvalue) ? maxvalue : NaN;
}

module.exports = maximum;