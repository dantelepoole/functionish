/**
 * @module diff
 */

'use strict';

/**
 * Return an iterable producing only those items from *list1* that are not present in *list2*, but without duplicates.
 * 
 * `diff()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const diff = require('functionish/diff');
 * 
 * Array.from( diff( [1,2,3], [3,4,5] ) ); // returns [1,2]
 *  
 * @func diff
 * @param {iterable} list2 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function diff(list1, list2) {

        return {
            [Symbol.iterator] : function* () {

                const uniqitems = new Set(list2);

                for(const item of list1) if(uniqitems.size < uniqitems.add(item).size) yield item;
            }
        }
    }
)
