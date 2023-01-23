/**
 * @module types/notarray
 */
'use strict';

const isarray = require('./isarray');

/**
 * Return true if the argument is not an instance of the Javascript native Array class.
 * 
 * @example <caption>Example usage of `notarray()`</caption>
 * 
 * const { notarray } = require('functionish/types');
 * 
 * notarray([]); // returns false
 * notarray( new Array(42) ); // returns false
 * 
 * notarray(Array); // returns true
 * 
 * @function notarray
 * @see {@link module:types/isarray isarray()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notarray(array) {
    return ! isarray(array);
}

module.exports = notarray;