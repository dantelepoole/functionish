/**
 * @module math/maximum
 */

'use strict';

/**
 * Return the *number* with the highest value. This function is merely an alias for the {@link external:Math.max Math.max()} method.
 * 
 * @function maximum
 * @see {@link external:Math.max Math.max()}
 * @param {...number[]} numbers The numbers to select the highest value from
 * @returns {number} The *number* with the highest value or `NaN` if there is none
 */
module.exports = Math.max;