/**
 * @module lists/zip
 */

'use strict';

const curry2 = require('../curry2');
const isarray = require('../types/isarray');

/**
 * Return an iterable that produces 2-element arrays containing the next item from *list1* and
 * the next item from *list2*. The returned iterable has the same length as the shortest *list*.
 * 
 * If *list1* is an array, an array is returned. Otherwise, *list1* and *list2* are presumed to be
 * iterable objects and an iterable object is returned that operates lazily.
 * 
 * `zip()` is curried by default with binary arity.
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

    const zippedlist = zipiterable(list1, list2);

    return isarray(list1)
         ? Array.from(zippedlist)
         : zippedlist;
}

function zipiterable(list1, list2) {

    return {

        [Symbol.iterator]() {

            const iterator1 = list1[Symbol.iterator]();
            const iterator2 = list2[Symbol.iterator]();

            return { 

                next() {
                    
                    const item1 = iterator1.next();
                    const item2 = iterator2.next();
            
                    return (item1.done || item2.done)
                         ? { done:true }
                         : { done:false, value:[item1.value, item2.value] }
                }
            }
        }
    }
}

module.exports = curry2(zip);