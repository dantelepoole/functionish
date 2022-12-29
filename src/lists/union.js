/**
 * @module lists/union
 */

'use strict';

const HASHFUNC_ID = x => x;

/**
 * Return an iterable producing the items from *list1* followed by the items in *list2*, with duplicate items removed.
 * `union()` differs from {@link module:append append()} in that, unlike {@link module:append append()}, `union()`
 * discard duplicate items.
 * 
 * If *hashfunc* is `null` or `undefined` (default), the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * @func union
 * @see {@link module:append append()}
 * @param {function} hashfunc The hashing function for comparing list items for equality
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
module.exports = function union(hashfunc, list1, list2) {

    hashfunc = (hashfunc ?? HASHFUNC_ID);

    return {
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory(hashfunc);

            for(const value of list1) isuniq(value) && (yield value);
            for(const value of list2) isuniq(value) && (yield value);
        }
    }
}

function isuniqfactory(hashfunc) {

    const dedup = new Set();

    return value => (dedup.size < dedup.add( hashfunc(value) ).size);
}