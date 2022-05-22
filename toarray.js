/**
 * @module toarray
 */

'use strict';

const isarray = require('./isarray');

/**
 * If *iterable* is an array return it. Otherwise, return a new Array initialized with the items from *iterable*.
 * 
 * If *iterable* is not iterable, an empty array is returned.
 * 
 * @func toarray
 * @param {iterable} [iterable] An iterable that produces the items to initialize the array with
 * @returns {any[]}
 */
module.exports = function toarray(iterable) {
    return isarray(iterable) ? iterable : Array.from(iterable);
}