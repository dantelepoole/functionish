/**
 * @module arrays/at
 */

'use strict';

/**
 * Retrieve the item from *array* at index *index* or `undefined` if no such item exists or
 * if *array* is not indexable.
 * 
 * If *index* is negative, it represents the index counting down from the end of *array*
 * (so -1 represents the last item in *list*).
 * 
 * @example <caption>Example usage of `at()`</caption>
 * 
 * const { at } = require('functionish/array');
 * 
 * const array = [1,2,3,42,5];
 * const item = at( [1,2,3,42,5], 3 );
 * 
 * console.log( item ); // prints 42
 * 
 * @function at
 * @param {any[]} array The array to retrieve the item from
 * @param {number} index The index of the item to retrieve
 * @returns {any}
 */
function at(array, index) {

    if(index < 0) index += array.length;

    return array[index];
}

module.exports = at;