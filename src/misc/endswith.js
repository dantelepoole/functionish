/**
 * @module misc/endswith
 */

'use strict';

const curry = require('../curry');

/**
 * Functional variant of {@link external:String.prototype.endsWith String.prototype.endsWith()}.
 * 
 * If *source* is not a string, an error is thrown.
 * 
 * `endswith()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `endswith()`</caption>
 * 
 * const { endswith } = require('functionish/misc');
 * 
 * endswith('bar', 'foobar'); // returns true
 * 
 * @function endswith
 * @see {@link external:String.prototype.endsWith String.prototype.endsWith()}
 * @see {@link module:misc/startswith startswith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
function endswith(target, source) {
    return source.endsWith(target);
}

module.exports = curry(1, endswith);