/**
 * @module symmetricdifference
 */

'use strict';

const cachingiterable = require('./lib/cachingiterable');
const difference = require('./difference');
const union = require('./union');

/**
 * Return an array with only those items that are present in either *list1* or *list2*, but not both. The returned
 * array will not contain any duplicates. 
 * 
 * `symmetricdifference()` is curried by default.
 * 
 * @func symmetricdifference
 * @param {any[]} list1 The first array
 * @param {any[]} list2 The second array
 * @returns {any[]}
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

