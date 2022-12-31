/**
 * @module types/iserror
 */

'use strict';

/**
 * Return `true` if the argument is an instance of the Javascript native Error class. Otherwise,
 * return `false`.
 * 
 * @example
 * const iserror = require('functionish/types/iserror');
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
 * @see {@link module:types/noterror noterror()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = require('util').types.isNativeError;