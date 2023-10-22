/**
 * @module types/iserror
 */

'use strict';

/**
 * Alias for the `types.isNativeError()` method of NodeJS's `util` package.
 *  
 * Return `true` if the argument is an instance of the Javascript native Error class. Otherwise,
 * return `false`.
 * 
 * @example <caption>Example usage of `iserror()`</caption>
 * 
 * const { iserror } = require('functionish/types');
 * 
 * iserror(new Error()); // returns true
 * iserror(new TypeError()); // returns true
 * 
 * class MyError extends Error {}
 * iserror(new MyError()); // returns true
 * 
 * iserror(Error); // returns false
 * 
 * @function iserror
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = require('util').types.isNativeError;