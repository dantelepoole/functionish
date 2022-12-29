/**
 * @module lists/diff
 */

'use strict';

const HASHFUNC_ID = x => x;

/**
 * Return an iterable producing only those items from *list1* that are not present in *list2*, but without duplicates.
 * 
 * If *hashfunc* is `null` or `undefined` (default), the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * @example
 * 
 * const diff = require('functionish/lists/diff');
 * 
 * Array.from( diff( [1,2,3], [3,4,5] ) ); // returns [1,2]
 *  
 * @func diff
 * @param {function} hashfunc The hashing function 
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = function diff(hashfunc, list1, list2) {

    hashfunc = (hashfunc ?? HASHFUNC_ID);

    return {
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory(list2, hashfunc);

            for(const value of list1) isuniq(value) && (yield value);
        }
    }
}

function isuniqfactory(list, hashfunc) {

    const dedup = new Set( hashingiterable(list, hashfunc) );

    return value => (dedup.size < dedup.add( hashfunc(value) ).size);
}

function hashingiterable(list, hashfunc) {

    return {
        [Symbol.iterator]: function* () {
            for(const value of list) yield hashfunc(value);
        }
    }
}
