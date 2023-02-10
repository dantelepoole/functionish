/**
 * @module lists/dedup
 */

'use strict';

const COMPARE_STRICT = 'strict';

const curry2 = require('../curry2');
const isarray = require('../types/isarray');
const isvoid = require('../types/isvoid');

/**
 * Return an iterable object that removes duplicate items from the *list*.
 * 
 * If *hashfunc* is <abbr title="null, undefined or NaN">void</abbr> or equals `'strict'`,
 * the list items are compared with strict equality. Otherwise, the list items are compared
 * with their hash values.
 * 
 * If *list* is an array, an array is returned. Otherwise, an iterable object is returned
 * that operates lazily.
 *
 *  `dedup()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `dedup()`</caption>
 * 
 * const { dedup } = require('functionish/lists');
 * 
 * const uniqitems = dedup( [1,1,2,2,3,3] );
 * 
 * Array.from(uniqitems); // returns [1,2,3];
 * 
 * @function dedup
 * @param {function} [hashfunc] The hashing function
 * @param {iterable} list An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
function dedup(hashfunc, list) {

    const dedupedlist = isvoid(hashfunc) || (hashfunc === COMPARE_STRICT)
                      ? dedupiterable(list)
                      : dedupiterablehashed(hashfunc, list);

    return isarray(list)
         ? Array.from(dedupedlist)
         : dedupedlist;
}

function dedupiterable(list) {

    return {
        [Symbol.iterator] : function* () {

            const dedup = new Set();
            
            for(const value of list) if(dedup.size < dedup.add(value).size) yield value;
        }
    }
}

function dedupiterablehashed(hashfunc, list) {

    return {
        [Symbol.iterator] : function* () {

            const dedup = new Set();
            
            for(const value of list) if(dedup.size < dedup.add( hashfunc(value) ).size) yield value;
        }
    }
}

module.exports = curry2(dedup);