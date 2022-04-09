'use strict';

const EMPTY_STRING = '';

const isvoid = require('./lib/isvoid');

/**
 * Return a string representation of *value*, converting `null`, `undefined` and `NaN` to empty strings instead of
 * 'null', 'undefined' and 'NaN' like the Javascript {@link external:String String()} function does. Otherwise, this
 * function behaves identically to {@link external:String String()}.
 * 
 * @module tostring
 * @param {any} value The value to convert to a string
 * @returns {string}
 */
module.exports = function tostring(value) {
    return isvoid(value) ? EMPTY_STRING : String(value);
}