/**
 * @module types/notnan
 */
'use strict';

/**
 * Return `true` if *value* is not `NaN`. Otherwise, return `false`.
 * 
 * @example
 * const notnan = require('functionish/types/notnan');
 * 
 * notnan(NaN); // returns false
 * 
 * notnan(42); // returns true
 * notnan(undefined); // returns true
 * notnan(null); // returns true
 * 
 * @func notnan
 * @see {@link module:types/isnan isnan()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notnan(value) {
    return (value === value);
}