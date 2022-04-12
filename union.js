/**
 * @module union
 */

'use strict';

const isarray = require('./isarray');

/**
 * Return an array containing the items from *list1* and *list2* but without duplicates. If either list is neither
 * an array nor iterable, it is converted to a single item array first, unless it is `undefined`, in which case it
 * is ignored.
 * 
 * `union()` is curried by default.
 * 
 * @func union
 * @param {(any[]|any)} list1 The first list of items to combine
 * @param {(any[]|any)} list2 The second list of items to combine
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        return [ 
            ...new Set( [...toarray(list1), ...toarray(list2)] )  
            ];
    }
)

function toarray(value) {
    return isarray(value) ? value : [value];
}