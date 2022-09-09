/**
 * @module trim
 */

'use strict';


const EMPTY_STRING = '';

const isstring = require("./isstring");

const isnullorundefined = value => (value === null || value === undefined);

/**
 * If *value* is a string, remove any leading and trailing whitespace before returning it. If *value* is `null` or
 * `undefined`, return an empty string. Otherwise, convert *value* to a string and trim the result.
 * 
 * @func trim
 * @param {any} value The value to trim
 * @returns {string}
 */
module.exports = function trim(value) {

    return isstring(value) ? value.trim()
         : isnullorundefined(value) ? EMPTY_STRING
         : String(value).trim();
}