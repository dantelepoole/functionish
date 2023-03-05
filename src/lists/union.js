/**
 * @module lists/union
 */

'use strict';

const HASH_STRICT = 'strict';

const curry = require('../curry');
const isarray = require('../types/isarray');
const isvoid = require('../types/isvoid');

/**
 * Return an iterable producing the items from *list1* followed by the items in *list2*, with duplicate items removed.
 * `union()` differs from {@link module:append append()} in that, unlike {@link module:append append()}, `union()`
 * discard duplicate items.
 * 
 * If *hashfunc* is `'strict'`, the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be absolutely collision-free, otherwise `union()` can give incorrect results.
 * 
 * If *list1* is an array, an array is returned. Otherwise, *list1* and *list2* are presumed to be
 * iterable objects and an iterable object is returned that operates lazily.
 * 
 * `union()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `union()`</caption>
 * 
 * const { union } = require('functionish/lists');
 * 
 * const combined = union('strict', [1,2,3], [3,4,5]);
 * 
 * Array.from( combined ); // returns [1,2,3,4,5];
 * 
 * @function union
 * @see {@link module:append append()}
 * @param {function} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
function union(hashfunc, list1, list2) {

    const isuniq = isuniqfactory(hashfunc);

    const unionlist = {
        
        [Symbol.iterator] : function* () {

            for(const value of list1) isuniq(value) && (yield value);
            for(const value of list2) isuniq(value) && (yield value);
        }
    }

    return isarray(list1)
         ? Array.from(unionlist)
         : unionlist;
}

function isuniqfactory(hashfunc) {

    const dedup = new Set();

    return isvoid(hashfunc) || (hashfunc === HASH_STRICT)
         ? value => (dedup.size < dedup.add(value).size)
         : value => (dedup.size < dedup.add( hashfunc(value) ).size);
}

module.exports = curry(2, union);