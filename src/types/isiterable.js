/**
 * @module types/isiterable
 */

'use strict';

const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

/**
 * Return `true` if *iterable* appears to be an iterable object.
 * 
 * @example <caption>Example usage of `isiterable()`</caption>
 * 
 * const { isiterable } = require('functionish/types');
 * 
 * isiterable([]); // returns true
 * isiterable( new Set() ); // returns true
 * isiterable('foobar'); // returns true
 * isiterable({}); // returns false
 * 
 * @function isiterable
 * @param {any} iterable The value to check
 * @returns {boolean}
 */
function isiterable(iterable) {
    return (typeof iterable?.[Symbol.iterator] === TYPE_FUNCTION)
}

module.exports = isiterable;