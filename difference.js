/**
 * @module difference
 */

'use strict';

const isarray = require('./isarray');
const uniq = require('./uniq');

/**
 * Return a list only those items from *list1* that are not present in *list2*. The returned array will not contain any
 * duplicates. 
 * 
 * If either list is not an array, it will be converted to a single-item array first.
 * 
 * `difference()` is curried by default.
 * 
 * @func difference
 * @param {(any[]|any)} list1 The first list
 * @param {(any[]|any)} list2 The second list
 * @returns {any[]}
 */

module.exports = require('./curry2') (

    function difference(list1, list2) {

        list1 = toarray(list1);
        list2 = toarray(list2);

        const set2 = new Set(list2);
        const resultarray = [];

        const addifdistinct = item => { if( ! set2.has(item) ) resultarray.push(item) }
        list1.forEach(addifdistinct);

        return uniq(resultarray);
    }
)

function toarray(value) {
    return isarray(value) ? value : [value];
}