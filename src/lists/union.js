/**
 * @module lists/union
 */

'use strict';

const HASH_NONE = undefined;

const curry = require('../curry');
const isarray = require('../types/isarray');
const isvoid = require('../types/isvoid');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `union()`</caption>
 * 
 * [to do]
 * 
 * @function union
 * @see {@link module:append append()}
 * @param {function} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
function union(list1, list2) {
    return unionusing(HASH_NONE, list1, list2);
}

function unionusing(hashfunc, list1, list2) {

    const isuniq = isuniqfactory(hashfunc);
    const concatenatedlist = concatlists(list1, list2);

    const unionlist = {
        
        *[Symbol.iterator]() {
            for(const value of concatenatedlist) isuniq(value) && (yield value);
        }
    }

    return isarray(list1)
         ? Array.from(unionlist)
         : unionlist;
}

function concatlists(list1, list2) {

    return {
        *[Symbol.iterator]() {
            yield* list1;
            yield* list2;
        }
    }
}

function isuniqfactory(hashfunc) {

    const dedup = new Set();

    const isuniq = (hashfunc === HASH_NONE)
                 ? value => (dedup.size < dedup.add(value).size)
                 : value => (dedup.size < dedup.add( hashfunc(value) ).size);

    return isuniq;
}

module.exports = curry(1, union);
module.exports.using = curry(2, unionusing);