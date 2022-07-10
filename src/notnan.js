/**
 * @module notnan
 */
'use strict';

/**
 * Return `true` if *value* is not `NaN`. Otherwise, return `false`.
 * 
 * @func notnan
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notnan(value) {
    return (value === value);
}