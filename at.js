/**
 * @module at
 */

'use strict';

/**
 * Retrieve the item from *list* at index *index* or `undefined` if the index is invalid. If *index* is negative,
 * it represents the index counting down from the end of *list* (so -1 represents the last item in *list*).
 * 
 * `at()` is curried by default.
 * 
 * @example
 * 
 * const at = require('functionish/at');
 * 
 * const array = [1,2,3,42, 5];
 * const item = at(3, array);
 * console.log( item ); // prints `42`
 * 
 * @func at
 * @param {any[]} list The array to retrieve the item from
 * @param {number} index The index of the item to retrieve
 * @returns {any}
 */

module.exports = require('./curry2')(

    function at(list, index) {

        if( index < 0 ) index += list.length;

        return list[index];
    }
)
