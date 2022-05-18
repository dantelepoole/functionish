/**
 * @module zipwith
 */
'use strict';

const isarray = require('./isarray');
const minimumvalue = Math.min;

/**
 * Similar to  {@link module:zip zip()} except that *func* is applied to the elements of *list1* and *list2* and the
 * result added to the returned array.
 * 
 * `zipwith()` is curried by default.
 * 
 * @example
 *     
 * const zipwith = require('functionish/zipwith');
 * 
 * function sum(x,y) { return (x+y) }
 * 
 * const list1 = [1,3,5];
 * const list2 = [2,4,6];
 * 
 * zipwith(sum, list1, list2); // returns [ 3, 7, 11 ]
 * 
 * for( const item of zipwith(sum, 'foobar', 'Hari') ) console.log(item);
 * 
 * // prints:
 * //   'fH'
 * //   'oa'
 * //   'or'
 * //   'bi'
 * 
 * @func zipwith
 * @see {@link module:zip zip()}
 * @param {function} func The function to apply to each item in *list1* and *list2*
 * @param {(any[]|any)} list1 The first list of items
 * @param {(any[]|any)} list2 The second list of items
 * @returns {any[]}
 */
module.exports = require('./curry3')(

    function zipwith(func, list1, list2) {
        return isarray(list1) && isarray(list2) ? ziparrayswith(func, list1, list2)
             : zipiterableswith(func, list1, list2);
    }

)

function ziparrayswith(func, array1, array2) {

    const itemcount = minimumvalue(array1.length, array2.length);

    const resultarray = new Array(itemcount);

    for( let index = 0; index < itemcount; index++ ) {
        resultarray[index] = func(array1[index], array2[index]);
    }

    return resultarray;
}

function zipiterableswith(func, list1, list2) {

    const iterator1 = list1[Symbol.iterator]();
    const iterator2 = list2[Symbol.iterator]();

    function next() {
        const item1 = iterator1.next();
        const item2 = iterator2.next();

        return (item1.done || item2.done) ? { done:true } : { done:false, value:func(item1.value, item2.value)}
    }

    return {
        [Symbol.iterator]() {
            return { next }
        }
    }
}