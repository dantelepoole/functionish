/**
 * @module isvoid
 */

'use strict';

const isnan = require('./isnan');

/**
 * Return `true` if *value* is `null` or `undefined`, otherwise return `false`.
 * 
 * @func isvoid
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isvoid(value) {
    return (value === null) || (value === undefined);
}