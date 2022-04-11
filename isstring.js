/**
 * @module isstring
 * @ignore
 */

'use strict';

/**
 * Return `true` if *value* has type `string`.
 * 
 * @func isstring
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isstring(value) {
    return (typeof value === 'string');
}