/**
 * @module lists/diff
 */

'use strict';

const HASH_STRICT = 'strict';

const curry = require('../curry');
const isarray = require('../types/isarray');
const isvoid = require('../types/isvoid');

/**
 * Return an iterable producing only those items from *list1* that are not present in *list2*, but without duplicates.
 * 
 * If *hashfunc* is `'strict'`, the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be absolutely collision-free, otherwise `diff()` can give incorrect results.
 * 
 * If *list1* is an array, an array is returned. Otherwise, *list1* and *list2* are presumed to be
 * iterable objects and an iterable object is returned that operates lazily.
 * 
 * `diff()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `diff()`</caption>
 * 
 * const { diff } = require('functionish/lists');
 * 
 * const difference = diff('strict', [1,2,3], [3,4,5]);
 * 
 * Array.from( difference ); // returns [1,2]
 *  
 * @function diff
 * @param {(function|string)} hashfunc The hashing function or `'strict'` to use strict equality 
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function diff(hashfunc, list1, list2) {

    const difflist = isvoid(hashfunc) || (hashfunc === HASH_STRICT)
                   ? diffstrict(list1, list2)
                   : diffhash(hashfunc, list1, list2);

    return isarray(list1)
         ? Array.from(difflist)
         : difflist;
}

function diffhash(hashfunc, list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory(list2, hashfunc);

            for(const value of list1) isuniq(value) && (yield value);
        }
    }
}

function diffstrict(list1, list2) {

    return {
        
        [Symbol.iterator] : function* () {

            const dedup = new Set(list2);
            const isuniq = value => (dedup.size < dedup.add(value).size);

            for(const value of list1) isuniq(value) && (yield value);
        }
    }
}

function isuniqfactory(list, hashfunc) {

    const dedup = new Set( hashlist(list, hashfunc) );

    return value => (dedup.size < dedup.add( hashfunc(value) ).size);
}

function hashlist(list, hashfunc) {

    return {
        [Symbol.iterator]: function* () {
            for(const value of list) yield hashfunc(value);
        }
    }
}

module.exports = curry(2, diff);