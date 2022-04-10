/**
 * @module lib/isiterable
 * @ignore
 */

'use strict';

/**
 * Return `true` if *value* is recognized as an iterable object, meaning that *value* has a `[Symbol.iterator]`-property
 * that is a function *and* that *value* is *not* a string. While in Javascript strings are iterable, it is usually
 * not the intention to use a string in that context.
 * 
 * This method is not perfect for identifying iterators, but it should suffice for most use cases.
 * 
 * @func isiterable
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isiterable(value) {
    return (typeof value?.[Symbol.iterator] === 'function' && typeof value !== 'string');
}