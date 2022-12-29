/**
 * @module lists/uniq
 */

'use strict';

const HASHFUNC_ID = x => x;

/**
 * Return an iterable that produces the items in *list* in order but without any duplicate items.
 * 
 * If *hashfunc* is `null` or `undefined` (default), *list*'s items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * @func uniq
 * @param {function} [hashfunc] The hashing function for comparing list items for equality
 * @param {iterable} list An iterable object producing the items to remove duplicates from
 * @returns {iterable}
 */
module.exports = function uniq(hashfunc, list) {

    hashfunc = (hashfunc ?? HASHFUNC_ID);

    return {
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory(hashfunc);
            
            for(const value of list) isuniq(value) && (yield value);
        }
    }
}

function isuniqfactory(hashfunc) {

    const dedup = new Set();

    return value => (dedup.size < dedup.add( hashfunc(value) ).size);
}