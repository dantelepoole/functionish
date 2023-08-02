/**
 * @module misc/endswith
 */

'use strict';

const curry = require('../curry');

/**
 * Functional variant of {@link external:String.prototype.endsWith String.prototype.endsWith()}. Return `true` if
 * ths string *source* contains the *searchstring*.
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
 * @param {string} searchstring The target string to search for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
function endswith(searchstring, source) {
    return source.endsWith(searchstring);
}

module.exports = curry(1, endswith);