/**
 * @module lists/tail
 */

'use strict';

const isarray = require('../types/isarray');

/**
 * Return a copy of *list* without its first item.
 * 
 * If *list* is an array, an array is returned. Otherwise, *list* is presumed to be
 * iterable and an iterable object is returned that operates lazily.
 * 
 * @example <caption>Example usage of `tail()`</caption>
 * 
 * const { tail } = require('functionish/tail');
 * 
 * const tailnumbers = tail( [1,2,3,4,5] );
 * 
 * Array.from(tailnumbers); // returns [2,3,4,5]
 * 
 * @function tail
 * @param {iterable} list The list of items to return the tail of.
 * @returns {iterable}
 */
function tail(list) {
    
    return isarray(list)
         ? list.slice(1)
         : tailiterable(list);
}

function tailiterable(list) {

    return {

        [Symbol.iterator]: function* () {

            let skipitem = true;

            for(const value of list) skipitem ? (skipitem = false) : yield value;

        }
    }
}

module.exports = tail;