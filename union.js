/**
 * @module union
 */

'use strict';

const isiterable = require('./isiterable');

/**
 * Return an array containing the items from *list1* and *list2* but without duplicates. If either list is neither
 * an array nor iterable, it is converted to a single item array first, unless it is `undefined`, in which case it
 * is ignored.
 * 
 * `union()` is curried by default.
 * 
 * @func union
 * @param {(array|iterable|any)} list1 The first list of items to combine
 * @param {(array|iterable|any)} list2 The second list of items to combine
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        return [ 
            ...new Set( [...toiterable(list1), ...toiterable(list2)] )  
            ];
    }
)

function toiterable(value) {

    return isiterable(value) ? value
         : (value !== undefined) ? [value]
         : [];
}
