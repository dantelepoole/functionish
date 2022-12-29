/**
 * @module misc/split
 */

'use strict';

/**
 * Function variant of {@link external:String.prototype.split String.prototype.split()}.
 * 
 * @func split
 * @see {@link external:String.prototype.split String.prototype.split()}
 * @param {string} separator The delimiter string
 * @param {string} source The string to split
 * @returns {string[]}
 */
module.exports = function split(separator, source) {
    return source.split(separator);
}