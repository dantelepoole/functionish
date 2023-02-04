/**
 * @module lists/tail
 */

'use strict';

/**
 * Return a copy of *list* without its first item.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `tail()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `tail()` (e.g. by loading it into an array).
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

    return {

        [Symbol.iterator]: function* () {

            let skipitem = true;

            for(const value of list) skipitem ? (skipitem = false) : yield value;

        }
    }
}

module.exports = tail;