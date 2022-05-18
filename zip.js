/**
 * @module zip
 */

'use strict';

/**
 * Return an iterable that produces a 2-element array on each iteration containing the next item from *list1* and
 * the next item from *list2*. The returned iterable completes as soon as either arguments completes.
 * 
 * `zip()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const zip = require('functionish/zip');
 * 
 * const list1 = [1,2,3,4,5];
 * const list2 = [6,7,8];
 * 
 * for(const item of zip(list1, list2)) console.log(item);
 * 
 * // prints:
 * //   [1,6]
 * //   [2,7]
 * //   [3,8]
 * 
 * @func zip
 * @see {@link module:zipwith zipwith()}
 * @param {iterable} list1 The iterable to zip with the items from *list2* 
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function zip(list1, list2) {

        const iterator1 = list1[Symbol.iterator]();
        const iterator2 = list2[Symbol.iterator]();
    
        function next() {
            const item1 = iterator1.next();
            const item2 = iterator2.next();
    
            return (item1.done || item2.done) ? { done:true } : { done:false, value:[item1.value, item2.value]}
        }
    
        return {
            [Symbol.iterator]() {
                return { next }
            }
        }
    }
)