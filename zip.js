/**
 * @module zip
 */

'use strict';

const isarray = require('./isarray');

const minimumvalue = Math.min;

/**
 * Return an array combining *list1* and *list2*, with each element consisting of a 2-element array, the first element
 * holding the element at the corresponding index in *list1* and the second the corresponding element in *list2*. The
 * returned array's length will equal that of the shorter list.
 * 
 * If either list is not an array, it is converted to a single-item array first.
 * 
 * `zip()` is curried by default.
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
 * @func zip
 * @see {@link module:zipwith zipwith()}
 * @param {(any[]|any)} list1 The first list of items
 * @param {(any[]|any)} list2 The second list of items
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function zip(list1, list2) {
        return ziparrays( toarray(list1), toarray(list2) );
    }
)

function toarray(value) {
    return isarray? value : [value];
}

function ziparrays(array1, array2) {

    const length = minimumvalue(array1.length, array2.length);

    const resultarray = new Array(length);

    for( let index = 0; index < length; index++ ) resultarray[index] = [array1[index], array2[index]];

    return resultarray;
}