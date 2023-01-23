/**
 * @module types/notiterable
 */

'use strict';

/**
 * Return `true` if *iterable* does not appear to be an iterable object.
 * 
 * Any object with a `[Symbol.iterator]`-property with type 'function' is
 * considered iterable, except strings. Although Javascript strings are iterable, in practice iterating
 * over a string's characters is not what the intention.
 * 
 * @example <caption>Example usage of `notiterable()`</caption>
 * 
 * const { notiterable } = require('functionish/types');
 * 
 * notiterable([]); // returns false
 * notiterable( new Set() ); // returns false
 * notiterable( new Map() ); // returns false
 * 
 * notiterable('foobar'); // returns true
 * notiterable({}); // returns true
 * 
 * @function notiterable
 * @see {@link module:types/isiterable isiterable()}
 * @param {any} iterable The value to check
 * @returns {boolean}
 */
function notiterable(iterable) {

    return (typeof iterable?.[Symbol.iterator] !== TYPE_FUNCTION)
            ||
           (typeof iterable === TYPE_STRING);
}

module.exports = notiterable;
