/**
 * @module lists/symdiff
 */

'use strict';

const HASHFUNC_ID = x => x;

/**
 * Return an iterable that produces the items from *list1* that are not present in *list2, in order, followed
 * by the items from *list1* that are not present in *list2*, in order. The returned iterable will not produce
 * any duplicates. 
 * 
 * If *hashfunc* is `null` or `undefined` (default), the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * @example
 * 
 * const symdiff = require('functionish/lists/symdiff');
 * 
 * Array.from( symdiff( [1,2,3], [3,4,5] ) ); // returns [1,2,4,5]
 * 
 * @func symdiff
 * @param {function} hashfunc The hashing function for comparing list items for equality
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = function symdiff(hashfunc, list1, list2) {

    hashfunc = (hashfunc ?? HASHFUNC_ID);

    return {
        [Symbol.iterator] : function* () {

            const map2 = hashmapfactory(list2, hashfunc);
            const isuniqdiff = isuniqdiff_factory(map2, hashfunc);

            for(const value of list1) isuniqdiff(value) && (yield value);

            yield* map2.values();
        }
    }
}

function isuniqdiff_factory(map, hashfunc) {

    const dedup = new Set();

    return value => {
        const hashvalue = hashfunc(value);
        return (! map.delete(hashvalue)) && (dedup.size < dedup.add(hashvalue).size);
    }
}

function hashmapfactory(list, hashfunc) {

    return new Map(
        {
            [Symbol.iterator]: function* () {
                for(const value of list) yield [ hashfunc(value), value ];
            }
        }
    )
}