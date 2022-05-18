/**
 * @module zip
 */

'use strict';

const isarray = require('./isarray');
const minimumvalue = Math.min;

/**
 * If both arguments are arrays, return an array combining *list1* and *list2*, with each element consisting of a
 * 2-element array, the first element holding the element at the corresponding index in *list1* and the second the
 * corresponding element in *list2*. The returned array's length will equal that of the shorter list.
 * 
 * Otherwise, if either of both arguments are not arrays but are iterable, return an iterable that produces a 2-element
 * array on each iteration, the first element holding the element at the corresponding index in *list1* and the second
 * the corresponding element in *list2*. The returned iterable completes as soon as either arguments completes.
 * 
 * `zip()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const zip = require('functionish/zip');
 * 
 * const list1 = [1,3,5];
 * const list2 = [2,4,6];
 * 
 * zip(list1, list2); // returns [ [1,2], [3,4], [5,6] ]
 * 
 * for(const item of zip('foobar', 'Hari')) console.log(item);
 * 
 * // prints:
 * //   ['f', 'H']
 * //   ['o', 'a']
 * //   ['o', 'r']
 * //   ['b', 'i']
 * //
 * 
 * @func zip
 * @see {@link module:zipwith zipwith()}
 * @param {any[]} list1 The first array of items
 * @param {any[]} list2 The second array of items
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function zip(list1, list2) {
        return isarray(list1) && isarray(list2) ? ziparrays(list1, list2) : zipiterables(list1, list2);
    }
)

function ziparrays(array1, array2) {

    const itemcount = minimumvalue(array1.length, array2.length);

    const resultarray = new Array(itemcount);

    for( let index = 0; index < itemcount; index++ ) resultarray[index] = [array1[index], array2[index]];

    return resultarray;
}

function zipiterables(list1, list2) {

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