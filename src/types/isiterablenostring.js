/**
 * @module types/isiterablenostring
 */

'use strict';

const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

/**
 * Return `true` if *iterable* appears to be an iterable object but is not a string.
 * 
 * @example <caption>Example usage of `isiterablenostring()`</caption>
 * 
 * const { isiterablenostring } = require('functionish/types');
 * 
 * isiterablenostring([]); // returns true
 * isiterablenostring( new Set() ); // returns true
 * isiterablenostring('foobar'); // returns false
 * isiterablenostring({}); // returns false
 * 
 * @function isiterablenostring
 * @param {any} iterable The value to check
 * @returns {boolean}
 */
function isiterable(iterable) {

    return (typeof iterable?.[Symbol.iterator] === TYPE_FUNCTION)
            &&
           (typeof iterable !== TYPE_STRING);
}

module.exports = isiterable;