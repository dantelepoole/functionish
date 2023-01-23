/**
 * @module types/tostring
 */

'use strict';

const EMPTY_STRING = '';

/**
 * Return a string representation of *value*, converting `null` and `undefined` to empty strings instead of
 * 'null', 'undefined' like the Javascript {@link external:String String()} function does.
 * 
 * @example <caption>Example usage of `tostring()`</caption>
 * 
 * const { tostring } = require('functionish/types');
 * 
 * tostring( {} ); // returns "[object Object]"
 * tostring( 42 ); // returns "42"
 * tostring(); // returns ""
 * tostring(null); // returns ""
 * tostring(undefined); // returns ""
 * 
 * @function tostring
 * @see {@link external:String String()}
 * @param {any} value The value to convert to a string
 * @returns {string}
 */
function tostring(value) {
    return String(value ?? EMPTY_STRING);
}

module.exports = tostring;