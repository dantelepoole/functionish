/**
 * @module lists/uniq
 */

'use strict';

const HASH_STRICT = 'strict';

const curry2 = require('../curry2');
const isarray = require('../types/isarray');

/**
 * Return an iterable that produces the items in *list* in order but without any duplicate items.
 * 
 * If *hashfunc* is `'strict'`, *list*'s items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be absolutely collision-free, otherwise `uniq()` can give incorrect results.
 * 
 * If *list* is an array, an array is returned. Otherwise, *list* is presumed to be
 * iterable and an iterable object is returned that operates lazily.
 * 
 * `uniq()` is curried by default with binary arity.
 * 
 * @function uniq
 * @param {(function|string)} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list An iterable object producing the items to remove duplicates from
 * @returns {iterable}
 */
function uniq(hashfunc, list) {

    const uniqlist = uniqiterable(hashfunc, list);

    return isarray(list)
         ? Array.from(uniqlist)
         : uniqlist;
}

function uniqiterable(hashfunc, list) {

    return {
        
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory(hashfunc);
            
            for(const value of list) isuniq(value) && (yield value);
        }
    }
}

function isuniqfactory(hashfunc) {

    const dedup = new Set();

    return (hashfunc === HASH_STRICT)
         ? value => (dedup.size < dedup.add(value).size)
         : value => (dedup.size < dedup.add( hashfunc(value) ).size);
}

module.exports = curry2(uniq);