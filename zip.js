/**
 * @module zip
 */

'use strict';

const minimumvalue = Math.min;

/**
 * Return an array combining *list1* and *list2*, with each element consisting of a 2-element array, the first element
 * holding the element at the corresponding index in *list1* and the second the corresponding element in *list2*. The
 * returned array's length will equal that of the shorter list.
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
 * @param {any[]} list1 The first array of items
 * @param {any[]} list2 The second array of items
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function zip(list1, list2) {

        const itemcount = minimumvalue(array1.length, array2.length);

        const resultarray = new Array(itemcount);
    
        for( let index = 0; index < itemcount; index++ ) resultarray[index] = [array1[index], array2[index]];
    
        return resultarray;
    }
)
