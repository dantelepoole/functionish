/**
 * @module types/notpromise
 */

'use strict';

const ispromise = require('./ispromise');

/**
 * Return `true` if the argument is not an instance of the Javascript native Promise class.
 * Otherwise, return `false`.
 * 
 * @example
 * const notpromise = require('functionish/types/notpromise');
 * 
 * notpromise( Promise.resolve(42) ); // returns false
 * notpromise( Promise.reject(42) ); // returns false
 * 
 * notpromise(Promise); // returns true
 * 
 * @func notpromise
 * @see {@link module:types/ispromise ispromise()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notpromise(value) {
    return ! ispromise(value);
}