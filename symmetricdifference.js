/**
 * @module symmetricdifference
 */

'use strict';

const bind = require('./bind');
const cachingiterable = require('./lib/cachingiterable');
const isarray = require('./isarray');
const not = require('./not');
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

function difference(iterable1, iterable2) {

    const excludeiterable2 = excludeiterablepredicatefactory(iterable2);

    return filteriterable(excludeiterable2, iterable1);
}

function isarrayorstring(value) {
    return (typeof value === 'string' || isarray(value));
}

function excludeiterablepredicatefactory(iterable) {

    const includespredicate = isarrayorstring(iterable) ? bind('includes', iterable) : bind('has', new Set(iterable));

    return not(includespredicate);
}

function filteriterable(predicate, iterable) {
    
    return {

        [Symbol.iterator] : function* () {
            for(const item of iterable) if( predicate(item) ) yield item;
        }
    }
}