/**
 * @module misc/trim
 */

'use strict';

/**
 * Functional variant of {@link external:String.prototype.trim String.prototype.trim()}.
 * 
 * Return *value* with leading and trailing whitespace removed.
 * 
 * @function trim
 * @see {@link external:String.prototype.trim String.prototype.trim()}
 * @param {any} value The value to trim
 * @returns {string}
 */
function trim(value) {
    return value.trim();
}

module.exports = trim;