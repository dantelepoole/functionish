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
            ...new Set( concat(list1, list2) )  
            ];
    }
)

function concat(iter1, iter2) {

    return {
        [Symbol.iterator] : function* () {

            for( const item of iter1 ) yield item;
            for( const item of iter2 ) yield item;
        }
    }
}