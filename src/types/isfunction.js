/**
 * @module types/isfunction
 */

'use strict';

/**
 * Return `true` if *value* has type 'function'. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `isfunction()`</caption>
 * 
 * const { isfunction } = require('functionish/types');
 * 
 * isfunction(isfunction); // returns true
 * isfunction(x => x); // returns true
 * 
 * isfunction('function'); // returns false
 * 
 * @function isfunction
 * @see {@link module:types/notfunction notfunction()}
 * @param {value} value The value to check
 * @returns {boolean}
 */
function isfunction(value) {
    return (typeof value === 'function');
}

module.exports = isfunction;