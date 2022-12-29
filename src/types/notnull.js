/**
 * @module types/notnull
 */

'use strict';

/**
 * Return `true` if *value* is not `null`, otherwise return `false`.
 * 
 * @func notnull
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notnull(value) {
    return (value !== null);
}