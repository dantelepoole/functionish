/**
 * @module isnumber
 */

'use strict';

/**
 * Return `true` if *value* has type `number` *AND* it is not `NaN`.
 * 
 * @func isnumber
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnumber(value) {
    return (typeof value === 'number') && (value === value);
}