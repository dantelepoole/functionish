'use strict';

/**
 * Return `true` if *value* is recognized as an iterable object, meaning that *value* has a `[Symbol.iterator]`-property
 * that is a function *and* that *value* is *not* a string. While in Javascript strings are iterable, it is usually
 * not the intention to use a string in that context.
 * 
 * This method is not perfect for identifying iterators, but it should suffice for most use cases. Be sure to
 * thoroughly test your own use case to confirm your iterators are properly recognized. 
 * 
 * Be aware that while this function does recognize objects that implement the `@@iterator` method to provide an
 * iterator object, it does *not* iterator objects themselves.
 * 
 * @module lib/isiterable
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isiterable(value) {
    return (typeof value?.[Symbol.iterator] === 'function' && typeof value !== 'string');
}