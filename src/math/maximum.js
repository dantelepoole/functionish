/**
 * @module math/maximum
 */

'use strict';

/**
 * Return the highest value in the *values* list or `NaN` if the *values* list is empty.
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

    for(const value of values) {

        if(typeof value !== 'number') return NaN
        
        else if (maxvalue >= value) continue;
        
        else if (maxvalue < value || maxvalue !== maxvalue) maxvalue = value;
        
        else return NaN;
    }

    return maxvalue;
}

module.exports = maximum;