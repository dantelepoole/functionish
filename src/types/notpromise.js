/**
 * @module types/notpromise
 */

'use strict';

const ispromise = require('./ispromise');

/**
 * Return `true` if the argument is not an instance of the Javascript native Promise class.
 * Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `notpromise()`</caption>
 * 
 * const { notpromise } = require('functionish/types');
 * 
 * notpromise( Promise.resolve(42) ); // returns false
 * notpromise( Promise.reject(42) ); // returns false
 * 
 * notpromise(Promise); // returns true
 * 
 * @function notpromise
 * @see {@link module:types/ispromise ispromise()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notpromise(value) {
    return ! ispromise(value);
}

module.exports = notpromise;