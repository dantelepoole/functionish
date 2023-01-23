/**
 * @module types/ispromise
 */

'use strict';

/**
 * Return `true` if the argument is an instance of the Javascript native Promise class.
 * Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `ispromise()`</caption>
 * 
 * const ispromise = require('functionish/types/ispromise');
 * 
 * ispromise( Promise.resolve(42) ); // returns true
 * ispromise( Promise.reject(42) ); // returns true
 * 
 * ispromise(Promise); // returns false
 * 
 * @function ispromise
 * @see {@link module:types/notpromise notpromise()}
 * @param {promise} promise The promise to check
 * @returns {boolean}
 */
module.exports = require('util').types.isPromise;