/**
 * @module math/truncate
 */

'use strict';

/**
 * Return the integer part of a number by removing any fractional digits.
 * This function is merely a proxy for the {@link external:Math.trunc Math.trunc()} method.
 * 
 * @function truncate
 * @see {@link external:Math.trunc Math.trunc()}
 * @param {number} number The value to truncate
 * @returns {number} The trunated value
 */
module.exports = Math.trunc;