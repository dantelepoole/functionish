/**
 * @module misc/format
 */

'use strict';

/**
 * Alias for Node's {@link external:util.format require('util').format() method}.
 * 
 * @func format
 * @see {@link external:util.format require('util').format()}
 * @param {string} formatstring A printf-like format string
 * @param {...any} args The arguments to the format string
 * @returns {string}
 */
module.exports = require('util').format;