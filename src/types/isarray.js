/**
 * @module types/isarray
 */
'use strict';

/**
 * Alias for {@link external:Array#isArray Array.isArray()}. Return true if the argument is
 * an instance of the Javascript native Array class. Otherwise, return false.
 * 
 * @example <caption>Example usage of `isarray()`</caption>
 * 
 * const { isarray } = require('functionish/types');
 * 
 * isarray([]); // returns true
 * isarray(42); // returns false
 * 
 * @function isarray
 * @see {@link external:Array#isArray Array.isArray()}
 * @see {@link module:types/notarray notarray()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = Array.isArray;