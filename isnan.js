/**
 * @module isnan
 */
'use strict';

/**
 * Return `true` if *value* is `NaN`. Otherwise, return `false`.
 * 
 * @func isnan
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnan(value) {
    return (value !== value);
}