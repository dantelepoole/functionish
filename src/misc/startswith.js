/**
 * @module misc/startswith
 */

'use strict';

/**
 * Function variant of {@link external:String.prototype.startsWith String.prototype.startsWith()}.
 * 
 * @func startswith
 * @see {@link external:String.prototype.startsWith String.prototype.startsWith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
module.exports = function startswith(target, source) {
    return source.startsWith(target);
}