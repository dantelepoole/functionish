/**
 * @module notiterable
 */

'use strict';

/**
 * Return `false` if *value* is recognized as an iterable object, meaning that *value* has a `[Symbol.iterator]`
 * property that is a function. Otherwise, return `true`.
 * 
 * This method is not perfect for identifying iterators, but it should suffice for most use cases. Beware that in
 * Javascript strings are iterable.
 * 
 * @func notiterable
 * @see {@link module:isiterable isiterable()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notiterable(value) {
    return (typeof value?.[Symbol.iterator] !== 'function');
}