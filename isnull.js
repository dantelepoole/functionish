/**
 * @module isnull
 * @ignore
 */

'use strict';

/**
 * Return `true` if *value* is `null`, otherwise return `false`.
 * 
 * @func isnull
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnull(value) {
    return (value === null);
}