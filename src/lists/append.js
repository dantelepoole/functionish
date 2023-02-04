/**
 * @module lists/append
 */

'use strict';

const curry2 = require('../curry2');


/**
 * Return an iterable object that produces *list1*'s items followed by *list2*'s items. `append()` differs from
 * {@link module:union union()} in that, unlike {@link module:union union()}, `append()` does *not* discard duplicate
 * items.
 * 
 * @example <caption>Example usage of `append()`</caption>
 * 
 * const { append } = require('functionish/lists');
 * 
 * Array.from( append([1,2], [3,4]) ); // returns '[1,2,3,4]'
 * 
 * @function append
 * @see {@link module:union union()}
 * @param {iterable} list1 The iterable object to append *list2* to
 * @param  {iterable} list2 The iterable object to append to *list1*
 * @returns {iterable}
 */
function append(list1, list2) {
    
    return {
        [Symbol.iterator] : function* () {
            yield* list1;
            yield* list2;
        }
    }
}

module.exports = curry2(append);