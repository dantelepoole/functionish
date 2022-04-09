'use strict';

const notnan = x => ! Number.isNaN(x);

/**
 * Return `true` if *value* has type `number` *and* it is not `NaN`.
 * 
 * @module lib/isnumber
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnumber(value) {
    return (typeof value === 'number') && notnan(value);
}