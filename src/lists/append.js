/**
 * @module lists/append
 */

'use strict';

/**
 * Return an iterable object that produces *list1*'s items followed by *list2*'s items. `append()` differs from
 * {@link module:union union()} in that, unlike {@link module:union union()}, `append()` does *not* discard duplicate
 * items.
 * 
 * @example
 * 
 * const append = require('functionish/lists/append');
 * 
 * Array.from( append([1,2], [3,4]) ); // returns '[1,2,3,4]'
 * 
 * @func append
 * @see {@link module:union union()}
 * @param {iterable} list1 The iterable object to append *list2* to
 * @param  {iterable} list2 The iterable object to append to *list1*
 * @returns {iterable}
 */

module.exports = function append(list1, list2) {
    
    return {
        [Symbol.iterator] : function* () {
            yield* list1;
            yield* list2;
        }
    }
}