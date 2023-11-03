/**
 * @module types/isiterablenotstring
 */

'use strict';

const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

/**
 * Return `true` if *iterable* appears to be an iterable object but is not a string.
 * 
 * @example <caption>Example usage of `isiterablenotstring()`</caption>
 * 
 * const { isiterablenotstring } = require('functionish/types');
 * 
 * isiterablenotstring([]); // returns true
 * isiterablenotstring( new Set() ); // returns true
 * isiterablenotstring('foobar'); // returns false
 * isiterablenotstring({}); // returns false
 * 
 * @function isiterablenotstring
 * @param {any} iterable The value to check
 * @returns {boolean}
 */
function isiterablenotstring(iterable) {

    return (typeof iterable?.[Symbol.iterator] === TYPE_FUNCTION)
            &&
           (typeof iterable !== TYPE_STRING);
}

module.exports = isiterablenotstring;