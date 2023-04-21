/**
 * @module lists/symdiff
 */

'use strict';

const curry = require('../curry');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `symdiff()`</caption>
 * 
 * [to do]
 * 
 * @function symdiff
 * @param {(function|string)} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function symdiff(list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const set2 = new Set(list2);
            const isuniqdiff = isuniqdiff_factory(set2);
        
            for(const value of list1) isuniqdiff(value) && (yield value);
        
            yield* set2;
        }
    }
}

function symdiffusing(hashfunc, list1, list2) {

    return {

        [Symbol.iterator] : function* () {

            const map2 = hashmapfactory(list2, hashfunc);
            const isuniqdiff = isuniqdiff_factory_hash(map2, hashfunc);

            for(const value of list1) isuniqdiff(value) && (yield value);

            yield* map2.values();
        }
    }

}

function isuniqdiff_factory(valueset) {

    const dedup = new Set();

    const isuniqdiff = value => !valueset.delete(value) && (dedup.size < dedup.add(value).size);

    return isuniqdiff;
}

function isuniqdiff_factory_hash(map, hashfunc) {

    const dedup = new Set();

    return function isuniqdiff(value) {

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

module.exports = curry(1, symdiff);
module.exports.using = curry(2, symdiffusing);