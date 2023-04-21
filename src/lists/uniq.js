/**
 * @module lists/uniq
 */

'use strict';

const HASH_NONE = undefined;

const curry = require('../curry');
const isarray = require('../types/isarray');
const isvoid = require('../isvoid');

/**
 * [to do]
 * 
 * @function uniq
 * @param {(function|string)} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list An iterable object producing the items to remove duplicates from
 * @returns {iterable}
 */
function uniq(list) {
    return uniqlist(HASH_NONE, list);
}

function uniqusing(hashfunc, list) {
    return uniqlist(hashfunc, list);
}

function uniqlist(hashfunc, list) {

    return {
        
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory(hashfunc);
            
            for(const value of list) isuniq(value) && (yield value);
        }
    }
}

function isuniqfactory(hashfunc=HASH_NONE) {

    const dedup = new Set();

    const isuniq = (hashfunc === HASH_NONE)
                 ? value => (dedup.size < dedup.add(value).size)
                 : value => (dedup.size < dedup.add( hashfunc(value) ).size);

    return isuniq;
}

uniq.using = curry(1, uniqusing);

module.exports = uniq;