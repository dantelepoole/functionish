/**
 * @module types/tostring
 */

'use strict';

const EMPTY_STRING = '';

/**
 * Return a string representation of *value*, converting `null` and `undefined` to empty strings instead of
 * 'null', 'undefined' like the Javascript {@link external:String String()} function does.
 * 
 * @function tostring
 * @see {@link external:String String()}
 * @param {any} value The value to convert to a string
 * @returns {string}
 */
module.exports = function tostring(value) {
    return String(value ?? EMPTY_STRING);
}