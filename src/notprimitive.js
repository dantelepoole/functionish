/**
 * @module notprimitive
 */

'use strict';

/**
 * Return `true` if *value* is not `null` and has type 'object' or 'function'. Otherwise, return `false`.
 * 
 * @func notprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notprimitive(value) {
    return (typeof value === 'function') || (typeof value === 'object' && value !== null);
}