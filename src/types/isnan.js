/**
 * @module types/isnan
 */
'use strict';

/**
 * Return `true` if *value* is `NaN`. Otherwise, return `false`.
 * 
 * @example
 * const isnan = require('functionish/types/isnan');
 * 
 * isnan(NaN); // returns true
 * 
 * isnan(42); // returns false
 * isnan(undefined); // returns false
 * isnan(null); // returns false
 * 
 * @function isnan
 * @see {@link module:types/notnan notnan()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnan(value) {
    return (value !== value);
}