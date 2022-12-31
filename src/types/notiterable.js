/**
 * @module types/notiterable
 */

'use strict';

/**
 * Return `true` if *iterable* does not appear to be an iterable object. An object is considered *iterable*
 * if has a `[Symbol.iterator]`-property with type 'function'.
 * 
 * Although in Javascript strings are iterable, this function reports strings as non-iterable, since
 * in practice the intention is usually not to iterate over strings.
 * 
 * @example
 * const isiterable = require('functionish/types/isiterable');
 * 
 * notiterable([]); // returns false
 * notiterable( new Set() ); // returns false
 * notiterable( new Map() ); // returns false
 * 
 * notiterable('foobar'); // returns true
 * notiterable({}); // returns true
 * 
 * @func notiterable
 * @see {@link module:types/isiterable isiterable()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notiterable(value) {
    return (typeof value?.[Symbol.iterator] !== 'function') || (typeof value === 'string');
}