/**
 * @module isvoid
 */

'use strict';

/**
 * Return `true` if *value* is `null`, `undefined` or `NaN`, otherwise return `false`.
 * 
 * @func isvoid
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isvoid(value) {
    return (value === null) || (value === undefined) || (value !== value);
}