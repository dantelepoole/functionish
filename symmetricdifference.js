/**
 * @module symmetricdifference
 */

'use strict';

const cachingiterable = require('./lib/cachingiterable');
const difference = require('./difference');
const union = require('./union');

/**
 * Return an iterable producing only those items that are present in either *list1* or *list2*, but not both. The
 * returned iterable will not produce any duplicates. 
 * 
 * `symmetricdifference()` is curried by default.
 * 
 * @func symmetricdifference
 * @param {iterable} iterable1 The first iterable
 * @param {iterable} iterable2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function symmetricdifference(iterable1, iterable2) {

        const cachediterable1 = cachingiterable(iterable1);
        const cachediterable2 = cachingiterable(iterable2);
    
        const symmdiff = union(
            difference(cachediterable1, cachediterable2),
            difference(cachediterable2, cachediterable1)
        )

        cachediterable1.clearcache();
        cachediterable2.clearcache();

        return symmdiff;
    }
)

