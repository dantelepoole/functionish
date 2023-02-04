/**
 * @module lists/symdiff
 */

'use strict';

const HASH_STRICT = 'strict';

const curry3 = require('../curry3');

/**
 * Return an iterable that produces the items from *list1* that are not present in *list2, in order, followed
 * by the items from *list1* that are not present in *list2*, in order. The returned iterable will not produce
 * any duplicates. 
 * 
 * If *hashfunc* is `'strict'`, the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be absolutely collision-free, otherwise `symdiff()` can give incorrect results.
 * 
 * The returned iterable object is lazy, meaning it iterates over the argument lists only when it
 * is iterated over itself. If you change the contents of either argument list after calling `symdiff()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `symdiff()` (e.g. by loading it into an array).
 * 
 * `symdiff()` is curried by default with ternary arity.
 * 
 * @example <caption>Example usage of `symdiff()`</caption>
 * 
 * const { symdiff } = require('functionish/lists');
 * 
 * const difference = symdiff('strict', [1,2,3], [3,4,5] );
 * 
 * Array.from(difference); // returns [1,2,4,5]
 * 
 * @function symdiff
 * @param {(function|string)} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function symdiff(hashfunc, list1, list2) {

    return (hashfunc === HASH_STRICT)
         ? symdiffstrict(list1, list2)
         : symdiffhash(hashfunc, list1, list2);
}

function symdiffhash(hashfunc, list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const map2 = hashmapfactory(list2, hashfunc);
            const isuniqdiff = isuniqdiff_factory(map2, hashfunc);

            for(const value of list1) isuniqdiff(value) && (yield value);

            yield* map2.values();
        }
    }
}

function symdiffstrict(list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const list2values = new Set(list2);
            const dedup = new Set();
        
            const isuniqdiff = value => ( ! list2values.delete(value) )
                                          &&
                                        (dedup.size < dedup.add(value).size);
        
            for(const value of list1) isuniqdiff(value) && (yield value);
        
            yield* list2values.values();
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

module.exports = curry3(symdiff);