/**
 * @module types/isiterable
 */

'use strict';

const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

/**
 * Return `true` if *iterable* appears to be an iterable object.
 * 
 * Any object with a `[Symbol.iterator]`-property with type 'function' is
 * considered iterable, except strings. Although Javascript strings are iterable, in practice iterating
 * over a string's characters is not what the intention.
 * 
 * @example <caption>Example usage of `isiterable()`</caption>
 * 
 * const { isiterable } = require('functionish/types');
 * 
 * isiterable([]); // returns true
 * isiterable( new Set() ); // returns true
 * isiterable('foobar'); // returns false
 * isiterable({}); // returns false
 * 
 * @function isiterable
 * @see {@link module:types/notiterable notiterable()}
 * @param {any} iterable The value to check
 * @returns {boolean}
 */
function isiterable(iterable) {

    return (typeof iterable?.[Symbol.iterator] === TYPE_FUNCTION)
            &&
           (typeof iterable !== TYPE_STRING);
}

module.exports = isiterable;