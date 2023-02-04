/**
 * @module lists/intersection
 */

'use strict';

const curry3 = require('../curry3');

const HASH_STRICT = 'strict';

/**
 * Return an iterable producing all items common to both *list1* and *list2*, but without duplicates.
 * 
 * If *hashfunc* is `strict` (default), the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * The returned iterable object is lazy, meaning it iterates over the argument lists only when it
 * is iterated over itself. If you change the contents of either argument list after calling `intersection()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `intersection()` (e.g. by loading it into an array).
 * 
 * `intersection()` is curried by default with ternary arity.
 * 
 * @example <caption>Example usage of `intersection()`</caption>
 * 
 * const { intersection } = require('functionish/lists');
 * 
 * const result = intersection('strict', [1,2,3,4,5], [3,4,5,6,7]);
 * Array.from(result); // returns [3,4,5]
 * 
 * @function intersection
 * @param {function} hashfunc The hashing function 
 * @param {iterable} list1 An iterable object
 * @param {iterable} list2 Another iterable object to intersect with
 * @returns {iterable}
 */
function intersection(hashfunc, list1, list2) {

    return (hashfunc === HASH_STRICT)
         ? intersectionstrict(list1, list2)
         : intersectionhash(hashfunc, list1, list2);
}

function intersectionhash(hashfunc, list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const dedup = new Set( hashlist(hashfunc, list1) );
            const intersectionfilter = value => dedup.delete( hashfunc(value) );
            
            for(const value of list2) intersectionfilter(value) && (yield value);
        }
    }
}

function intersectionstrict(list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const dedup = new Set(list1);
            const intersectionfilter = value => dedup.delete(value);

            for(const value of list2) intersectionfilter(value) && (yield value);
        }
    }
}

function hashlist(hashfunc, list) {

    return {
        
        [Symbol.iterator]: function* () {
            for(const value of list) yield hashfunc(value);
        }
    }
}

module.exports = curry3(intersection);