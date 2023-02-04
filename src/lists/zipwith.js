/**
 * @module lists/zipwith
 */

'use strict';

const curry3 = require('functionish/curry3');

/**
 * Similar to  {@link module:zip zip()} except that the returned iterable returns the result of applying *func* to the
 * elements of *list1* and *list2*.
 * 
 * The returned iterable object is lazy, meaning it iterates over the argument lists only when it
 * is iterated over itself. If you change the contents of either argument list after calling `zipwith()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `zipwith()` (e.g. by loading it into an array).
 * 
 * `zipwith()` is curried by default with ternary arity.
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
                         : { done:false, value:func(item1.value, item2.value)}
                }
            }
        }
    }
}

module.exports = curry3(zipwith);