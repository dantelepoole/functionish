/**
 * @module math/median
 */

'use strict';

const isodd = x => (x%2) === 1;
const numericsort = (a,b) => (a-b);

/**
 * Return the median value of the values in the *values* list.
 * 
 * @example
 * const median = require('functionish/math/median');
 * 
 * median( [0, 41, 42, 43, 84] ); // returns 42
 * median( [0, 41, 43, 84] ); // returns 42
 * 
 * @function median
 * @param {iterable} values The values to calculate the median of
 * @returns {number}
 */
module.exports = function median(values) {

    values = Array.from(values).sort(numericsort);
    
    const valuecount = values.length;
    const midindex = (valuecount/2);

    return (valuecount === 0) ? 0
         : isodd(valuecount) ? values[ Math.floor(midindex) ]
         : (values[midindex] + values[midindex-1]) / 2;
}