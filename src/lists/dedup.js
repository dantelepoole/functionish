/**
 * @module lists/dedup
 */

'use strict';

/**
 * Return an iterable object that produces the items *list* but without duplicates.
 * 
 * @func dedup
 * @param {iterable} list An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
module.exports = function dedup(list) {

    return {
        [Symbol.iterator] : function* () {

            const dedup = new Set();
            
            for(const value of list) if(dedup.size < dedup.add(value).size) yield value;
        }
    }
}