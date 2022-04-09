'use strict';

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');

/**
 * Similar to  {@link module:zip zip()} except that *func* is applied to the elements of *list1* and *list2* and the
 * result added to the returned array.
 * 
 * `zipwith()` is curried by default.
 * 
 * @module zip
 * @see {@link module:zip zip()}
 * @param {function} func The function to apply to each item in *list1* and *list2*
 * @param {(array|iterable|any)} list1 The first list of items
 * @param {(array|iterable|any)} list2 The second list of items
 * @returns {array[]}
 * @example
 *     const zipwith = require('functionish/zipwith');
 * 
 *     function multiply(x,y) { return (x*y) }
 * 
 *     const list1 = [1,3,5];
 *     const list2 = [2,4,6];
 * 
 *     zipwith(multiply, list1, list2); // returns [ 2, 12, 30 ]
 */
module.exports = require('./curry3')(

    function zipwith(func, list1, list2) {
        return ziparrayswith(func, toarray(list1), toarray(list2))
    }

)

function toarray(value) {

    return isarray? value
         : isiterable(value) ? [...value]
         : [value];
}

function ziparrayswith(func, array1, array2) {

    const length = Math.min(array1.length, array2.length);

    const resultarray = new Array(length);

    for( let index = 0; index < length; index++ ) resultarray[index] = func(array1[index], array2[index]);

    return resultarray;
}