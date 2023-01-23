/**
 * @module types/notnan
 */
'use strict';

/**
 * Return `true` if *value* is not `NaN`. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `notnan()`</caption>
 * 
 * const { notnan } = require('functionish/types');
 * 
 * notnan(NaN); // returns false
 * 
 * notnan(42); // returns true
 * notnan(undefined); // returns true
 * notnan(null); // returns true
 * 
 * @function notnan
 * @see {@link module:types/isnan isnan()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notnan(value) {
    return (value === value);
}

module.exports = notnan;