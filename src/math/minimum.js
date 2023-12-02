/**
 * @module math/minimum
 */

'use strict';

/**
 * Return the *number* with the lowest value. This function is merely an alias for the {@link external:Math.min
*  Math.min()} method.
 * 
 * @function minimum
 * @see {@link external:Math.min Math.min()}
 * @param {...number[]} numbers The numbers to select the lowest value from
 * @returns {number} The *number* with the lowest value or `NaN` if there is none
 */
module.exports = Math.min;