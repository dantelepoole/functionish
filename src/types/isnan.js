/**
 * @module types/isnan
 */
'use strict';

/**
 * Return `true` if *value* is `NaN`. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `isnan()`</caption>
 * 
 * const { isnan } = require('functionish/types');
 * 
 * isnan(NaN); // returns true
 * isnan(42); // returns false
 * isnan(undefined); // returns false
 * isnan(null); // returns false
 * 
 * @function isnan
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isnan(value) {
    return (value !== value);
}

module.exports = isnan;