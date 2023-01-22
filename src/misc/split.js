/**
 * @module misc/split
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Functional variant of {@link external:String.prototype.split String.prototype.split()}. The
 * *source* argument must be a string, on which the `split()` method is invoked with *separator*
 * as the argument.
 * 
 * `split()` is curried by default with binary arity.
 * 
 * @function split
 * @see {@link external:String.prototype.split String.prototype.split()}
 * @param {string} separator The delimiter string
 * @param {string} source The string to split
 * @returns {string[]}
 */
function split(separator, source) {
    return source.split(separator);
}

module.exports = curry2(split);