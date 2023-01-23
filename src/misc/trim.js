/**
 * @module misc/trim
 */

'use strict';

/**
 * Functional variant of {@link external:String.prototype.trim String.prototype.trim()}.
 * 
 * Return *value* with leading and trailing whitespace removed.
 * 
 * @example <caption>Example usage of `trim()`</caption>
 * 
 * const { trim } = require('functionish/misc');
 * 
 * trim(' \n foobar \t\n\r'); // returns 'foobar'
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