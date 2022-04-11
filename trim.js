'use strict';

const EMPTY_STRING = '';

const isvoid = require('./isvoid');

/**
 * If *value* is a string, remove any leading and trailing whitespace before returning it. If *value* is `null`,
 * `undefined` or `NaN`, return an empty string. Otherwise, convert *value* to a string and trim the result.
 * 
 * @module trim
 * @param {any} value The value to trim
 * @returns {string}
 */
module.exports = function trim(value) {

    return (typeof value === 'string') ? value.trim()
         : isvoid(value) ? EMPTY_STRING
         : String(value).trim();
}