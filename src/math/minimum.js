/**
 * @module math/minimum
 */

'use strict';

/**
 * Return the lowest value in the *values* list or `NaN` if the *values* list is empty.
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

    for(const value of values) {

        if(minvalue <= value) continue;

        minvalue = value;
    }

    return minvalue;
}

module.exports = minimum;