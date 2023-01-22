/**
 * @module misc/format
 */

'use strict';

/**
 * Alias for Node's *require('util').*{@link external:util.format format()} method.
 * 
 * @function format
 * @see {@link external:util.format format()}
 * @param {string} formatstring A printf-like format string
 * @param {...any} args The arguments to the format string
 * @returns {string}
 */
module.exports = require('util').format;