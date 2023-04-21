/**
 * @module lists/zipwith
 */

'use strict';

const curry = require('../curry');
const isarray = require('../types/isarray');

/**
 * Similar to  {@link module:zip zip()} except that the returned iterable returns the result of applying *func* to the
 * elements of *list1* and *list2*. The returned iterable has the same number of items as the longest *list*.
 * 
 * `zipwith()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `zipwith()`</caption>
 *     
 * const { zipwith } = require('functionish/lists/zipwith');
 * 
 * const sum = (a,b) => (a+b);
 * const zipped = zipwith(sum, [1,2,3,4,5], [6,7,8]);
 * 
 * Array.from(zipped); // returns [7, 9, 11]
 * 
 * @function zipwith
 * @see {@link module:lists/zip zip()}
 * @param {function} func The function to apply to the items from *list1* and *list2*
 * @param {iterable} list1 The iterable to zip with the items from *list2*
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
function zipwith(func, list1, list2) {

    const zippedlist = zipwithiterable(func, list1, list2);

    return isarray(list1)
         ? Array.from(zippedlist)
         : zippedlist;
}

function zipwithiterable(func, list1, list2) {

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

                    const value = done ? VALUE_NONE : func(item1.value, item2.value);

                    return { done, value }
                }
            }
        }
    }
}

module.exports = curry(2, zipwith);