/**
 * @module concat
 */

'use strict';

const isiterable = require('./isiterable');

const isconcatable = value => (typeof value?.concat === 'function');

/**
 * If *list1* has a `concat()` method, pass *list2* to it and return the result. Otherwise, if *list1* is iterable
 * convert it to an array and its `concat()` method with *list2*. If *list1* is neither, convert *list1* to a
 * single-item array call its `concat()` method with *list2*.
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
 * concat(list1, list2); // returns '[1,2,3,4]
 * 
 * @func concat
 * @param {(any[]|iterable)} list1 The array or iterable of items to concat list2 to
 * @param  {(any[]|iterable)} list2 The list of items to concat to *list1*
 * @returns {any[]}
 */

module.exports = function concat(list1, list2) {

    return isconcatable(list1) ? list1.concat(list2)
        : isiterable(list1) ? [...list1].concat(list2)
        : [ list1 ].concat(list2);
}