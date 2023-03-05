/**
 * @module math/truncate
 */

'use strict';

/**
 * [to do]
 * 
 * This function is an alias for {@link external:Math.trunc Math.trunc()}.
 * 
 * @example
 * const truncate = require('functionish/math/truncate');
 * 
 * truncate(42.1); // returns 42
 * truncate(-42.1); // returns -42;
 * 
 * @function truncate
 * @see {@link external:Math.truncate Math.truncate()}
 * @param {number} value The value to truncate
 * @returns {number}
 */
module.exports = Math.trunc;