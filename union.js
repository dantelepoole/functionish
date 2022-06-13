/**
 * @module union
 */

'use strict';

const uniq = require('./uniq');

/**
 * Return an iterable producing the items from *list1* and *list2* but without duplicates. The function iterates through
 * *list1* followed by *list2*, skipping any duplicate items in either list.
 * 
 * `union()` is curried by default with binary arity.
 * 
 * @func union
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        return {
            [Symbol.iterator] : function* () {

                const combinedlist = concatiterables(list1, list2);
                for(const item of uniq(combinedlist) ) yield item;
            }
        }
    }
)

function concatiterables(iterable1, iterable2) {

    return {
        [Symbol.iterator] : function* () {
            for( const item of iterable1 ) yield item;
            for( const item of iterable2 ) yield item;
        }
    }
}