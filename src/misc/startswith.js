/**
 * @module misc/startswith
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Functional variant of {@link external:String.prototype.startsWith String.prototype.startsWith()}.
 * The *source* argument must be a string, on which the `startsWith()` method is called with *target*
 * as the argument.
 * 
 * `startswith()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `startswith()`</caption>
 * 
 * const { startswith } = require('functionish/misc');
 * 
 * startswith('foo', 'foobar'); // returns true
 * 
 * @function startswith
 * @see {@link external:String.prototype.startsWith String.prototype.startsWith()}
 * @see {@link module:misc/endswith endswith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
function startswith(target, source) {
    return source.startsWith(target);
}

module.exports = curry2(startswith);