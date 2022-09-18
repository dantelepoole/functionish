/**
 * @module array
 */

'use strict';

const EMPTY_ARRAY = Object.freeze([]);

/**
 * Return an array containing the items produced by *iterable* in order. If *iterable* is already an array, a shallow
 * copy of the array is returned. If *iterable* is not iterable, an empty array is returned.
 * 
 * @func array
 * @param {iterable} [iterable] An iterable object that produces the items to populate the returned array with
 * @returns {any[]}
 */
module.exports = function array(iterable) {
    return Array.from(iterable ?? EMPTY_ARRAY);
}