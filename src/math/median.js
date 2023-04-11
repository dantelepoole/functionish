/**
 * @module math/median
 */

'use strict';

const isarray = require('../types/isarray');

const isodd = x => (x%2) === 1;
const numericsort = (a,b) => (a-b);

/**
 * Return the median value of the values in the *values* list.
 * 
 * The *values* must be in sorted order, otherwise the result will be unreliable. If the *sort* parameter is
 * `true` (default), the function will sort the *values* itself. Otherwise, the *values* are assumed to be
 * sorted already and the sort-stage is skipped.
 * 
 * @example
 * const median = require('functionish/math/median');
 * 
 * median( [84, 0, 43, 41] ); // returns 42 after sorting the input (the sort-parameter is true by default)
 * median( false, [0, 41, 42, 43, 84] ); // returns 42 without sorting the input
 * 
 * @function median
 * @param {boolean} [sort=true] If `true` the *values* will be sorted before calculating the *values*
 * @param {iterable} values The values to calculate the median of
 * @returns {number}
 */
function median(sort, values) {

    (arguments.length === 1) && ([sort, values] = [true, sort]);

    isarray(values) || (values = Array.from(values));

    sort && values.sort(numericsort);

    const midindex = (values.length/2);

    return (values.length === 0) ? 0
         : isodd(values.length) ? values[ Math.floor(midindex) ]
         : (values[midindex] + values[midindex-1]) / 2;
}

module.exports = median;