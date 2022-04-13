/**
 * @module union
 */

'use strict';

/**
 * Return an array containing the items from *list1* and *list2* but without duplicates.
 * 
 * `union()` is curried by default.
 * 
 * @func union
 * @param {any[]} list1 The first array of items to combine
 * @param {any[]} list2 The second array of items to combine
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        return [ 
            ...new Set( [...list1, ...list2] )  
            ];
    }
)