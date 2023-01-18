/**
 * @module misc/endswith
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Function variant of {@link external:String.prototype.endsWith String.prototype.endsWith()}.
 * 
 * If *source* is not a string, an error is thrown.
 * 
 * `endswith()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of endswith()</caption>
 * 
 * const { endswith } = require('functionish/misc');
 * 
 * endswith('bar', 'foobar'); // returns true
 * 
 * @function endswith
 * @see {@link external:String.prototype.endsWith String.prototype.endsWith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
function endswith(target, source) {
    return source.endsWith(target);
}

module.exports = curry2(endswith);