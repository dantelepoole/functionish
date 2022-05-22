/**
 * @module tail
 */

'use strict';

const isarray = require('./isarray');
const isstring = require('./isstring');

/**
 * Return an iterable producing all items from *iterable* except the first one. If *iterable* is an array, return an
 * array. If *iterable* is a string, return a string. Otherwise, return an iterable.
 * 
 * This function calls the `slice()` method of *iterable* if it is a string or an array. Otherwise, it iterates over
 * *iterable*, dropping the first item.
 * 
 * @func tail
 * @see {@link module:head head()}
 * @param {iterable} iterable The iterable of items to return the tail of
 * @returns {(any[]|string|iterable)}
 */
module.exports = function tail(iterable) {
    return isarray(iterable) || isstring(iterable) ? iterable.slice(1) : tailiterable(iterable);
}

function tailiterable(iterable) {

    return {
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();
            iterator.next();

            return iterator;
        }
    }
}