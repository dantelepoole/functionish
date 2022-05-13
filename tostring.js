/**
 * @module tostring
 */

'use strict';

const EMPTY_STRING = '';

/**
 * Return a string representation of *value*, converting `null` and `undefined` to empty strings instead of
 * 'null', 'undefined' and 'NaN' like the Javascript {@link external:String String()} function does. Otherwise, this
 * function behaves identically to {@link external:String String()}.
 * 
 * @func tostring
 * @param {any} value The value to convert to a string
 * @returns {string}
 */
module.exports = function tostring(value) {
    return String(value ?? EMPTY_STRING);
}