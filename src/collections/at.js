/**
 * @module collections/at
 */

'use strict';

/**
 * Retrieve the item from *indexable* at index *index* or `undefined` if no such item exists or
 * if *indexable* is not indexable.
 * 
 * If *index* is negative, it represents the index counting down from the end of *indexable*
 * (so -1 represents the last item in *list*).
 * 
 * @example
 * 
 * const at = require('functionish/collections/at');
 * 
 * const array = [1,2,3,42, 5];
 * const item = at(3, array);
 * console.log( item ); // prints `42`
 * 
 * @func at
 * @param {any[]} indexable The indexable object (e.g. Array) to retrieve the item from
 * @param {number} index The index of the item to retrieve
 * @returns {any}
 * @throws {Error} Error if *index* is `NaN` or not an integer number.
 */

module.exports = function at(indexable, index) {

    if(index < 0) index += indexable.length;

    return indexable[index];
}
