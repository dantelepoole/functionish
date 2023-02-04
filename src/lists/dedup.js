/**
 * @module lists/dedup
 */

'use strict';

/**
 * Return an iterable object that produces the items *list* but without duplicates.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `dedup()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `dedup()` (e.g. by loading it into an array).
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
 * @param {iterable} list An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
function dedup(list) {

    return {
        [Symbol.iterator] : function* () {

            const dedup = new Set();
            
            for(const value of list) if(dedup.size < dedup.add(value).size) yield value;
        }
    }
}

module.exports = dedup;