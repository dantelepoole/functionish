/**
 * @module concat
 */

'use strict';

/**
 * Pass *list2* to *list1*'s `concat()`-method and return the result.
 * 
 * `concat()` is curried by default.
 * 
 * @example
 * 
 * const concat = require('functionish/concat');
 * 
 * const hari = "Hari"
 * const seldon = "Seldon"
 * concat(hari, seldon); // returns 'HariSeldon'
 * 
 * const list1 = [1,2];
 * const list2 = [3,4];
 * concat(list1, list2); // returns '[1,2,3,4]'
 * 
 * @func concat
 * @param {any[]} list1 The array to concat *list2* to
 * @param  {any[]} list2 The array of items to concat to *list1*
 * @returns {any[]}
 */

module.exports = require('./curry2') (

    function concat(list1, list2) {
        return list1.concat(list2);
    }
)