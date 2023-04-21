/**
 * @module lists/zip
 */

'use strict';

const VALUE_NONE = undefined;

const curry = require('../curry');

/**
 * Return an iterable that produces 2-element arrays containing the next item from *list1* and
 * the next item from *list2*. The returned iterable has the same number of items as the longest *list*.
 * 
 * `zip()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `zip()`</caption>
 * 
 * const { zip } = require('functionish/lists');
 * 
 * const zipped = zip([1,2,3,4,5], [6,7,8]);
 * 
 * Array.from(zipped); // returns [ [1,6], [2,7], [3,8] ]
 * 
 * @function zip
 * @see {@link module:zipwith zipwith()}
 * @param {iterable} list1 The iterable to zip with the items from *list2* 
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
function zip(list1, list2) {

    return {

        [Symbol.iterator]() {

            const iterator1 = list1[Symbol.iterator]();
            const iterator2 = list2[Symbol.iterator]();

            let done = false;

            return { 

                next() {
                    
                    if(done) return { done:true }

                    const item1 = iterator1.next();
                    const item2 = iterator2.next();

                    done = item1.done && item2.done;

                    const value1 = item1.done ? VALUE_NONE : item1.value;
                    const value2 = item2.done ? VALUE_NONE : item2.value;
                    const value = done ? VALUE_NONE : [value1, value2];

                    return { done, value }
                }
            }
        }
    }
}

module.exports = curry(1, zip);