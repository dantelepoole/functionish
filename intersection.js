/**
 * @module intersection
 */

'use strict';

const uniq = require('./uniq');

/**
 * Return an iterable producing all items common to both *list1* and *list2*, but without duplicates.
 * 
 * `intersection()` is curried by default.
 * 
 * @func intersection
 * @param {iterable} iterable1 The first iterable
 * @param {iterable} iterable2 The second iterable
 * @returns {iterable}
 */
module.exports = require('./curry2') (

    function intersection(iterable1, iterable2) {

        const iterable1set = new Set(iterable1);
        const intersectionfilter = iterable1set.has.bind(iterable1set);
        const intersectioniterable = filteriterable(intersectionfilter, iterable2);
 
        return uniq(intersectioniterable);
    }
)

function filteriterable(predicate, iterable) {
    
    return {

        [Symbol.iterator] : function* () {
            for(const item of iterable) if( predicate(item) ) yield item;
        }
    }
}