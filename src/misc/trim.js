/**
 * @module misc/trim
 */

'use strict';


const tostring = require('./tostring)');

/**
 * If *value* is a string, remove any leading and trailing whitespace before returning it. If *value* is `null` or
 * `undefined`, return an empty string. Otherwise, convert *value* to a string and trim the result.
 * 
 * @func trim
 * @param {any} value The value to trim
 * @returns {string}
 */
module.exports = function trim(value) {
    return tostring(value).trim();
}