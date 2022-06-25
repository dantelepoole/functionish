/**
 * @module isnumber
 */

'use strict';

const isnan = require('./isnan');

/**
 * Return `true` if *value* does not have type `number` *OR* if is `NaN`.
 * 
 * @func notnumber
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notnumber(value) {
    return (typeof value !== 'number') || isnan(value);
}