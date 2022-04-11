/**
 * @module isnumber
 */

'use strict';

const notnan = x => ! Number.isNaN(x);

/**
 * Return `true` if *value* has type `number` *AND* it is not `NaN`.
 * 
 * @func isnumber
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnumber(value) {
    return (typeof value === 'number') && notnan(value);
}