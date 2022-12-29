/**
 * @module misc/endswith
 */

'use strict';

/**
 * Function variant of {@link external:String.prototype.endsWith String.prototype.endsWith()}.
 * 
 * If *source* is not a string, an error is thrown.
 * 
 * @func endswith
 * @see {@link external:String.prototype.endsWith String.prototype.endsWith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
module.exports = function endswith(target, source) {
    return source.endsWith(target);
}