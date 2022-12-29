/**
 * @module lists/intersection
 */

'use strict';

const HASHFUNC_ID = x => x;

/**
 * Return an iterable producing all items common to both *list1* and *list2*, but without duplicates.
 * 
 * If *hashfunc* is `null` or `undefined` (default), the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * @func intersection
 * @param {function} hashfunc The hashing function 
 * @param {iterable} list1 An iterable object
 * @param {iterable} list2 Another iterable object to intersect with
 * @returns {iterable}
 */
module.exports = function intersection(hashfunc, list1, list2) {

    hashfunc = (hashfunc ?? HASHFUNC_ID);

    return {

        [Symbol.iterator] : function* () {

            const intersectionfilter = intersectionfilterfactory(list1, hashfunc);
            
            for(const value of list2) intersectionfilter(value) && (yield value);
        }
    }
}

function intersectionfilterfactory(list, hashfunc) {

    const dedup = new Set( hashingiterable(list,hashfunc) );

    return value => dedup.delete( hashfunc(value) );
}

function hashingiterable(list, hashfunc) {

    return {
        [Symbol.iterator]: function* () {
            for(const value of list) yield hashfunc(value);
        }
    }
}