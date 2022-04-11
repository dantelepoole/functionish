/**
 * @module at
 */

'use strict';

const ITEM_NONE = undefined;

const isindexable = require('./isindexable');

/**
 * Retrieve the item from *list* at index *index* or `undefined` if the index does not exist.
 * 
 * The *list* may be an array or any indexable object (i.e. with a `length`-property and indexable by number).
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
 * @param {number} index The index of the item to retrieve
 * @param {any[]} list An array or other indexable object to retrieve the item from
 * @returns {any}
 */

module.exports = require('./curry2')(

    function at(index, list) {

        if( ! isindexable(list) ) return ITEM_NONE;

        if( index < 0 ) index += list.length;

        return list[index];
        
    }
)
