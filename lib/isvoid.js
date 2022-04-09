'use strict';

const isnan = require('./isnan');

/**
 * Return `true` if *value* is `null`, `undefined` or `NaN`, otherwise return `false`.
 * 
 * @module lib/isvoid
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isvoid(value) {

    return (value === undefined)
            || (value === null)
            || (typeof value === 'number' && isnan(value));
}