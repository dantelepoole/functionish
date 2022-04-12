/**
 * @module intersection
 */

'use strict';

const isarray = require('./isarray');
const uniq = require('./uniq');

/**
 * Return a list containing all elements common to both *list1* and *list2*. The returned array will not contain any
 * duplicates. If either list is not an array, it will be converted to a single-item array first.
 * 
 * `intersection()` is curried by default.
 * 
 * @func intersection
 * @param {(any[]|any)} list1 The first list
 * @param {(any[]|any)} list2 The second list
 * @returns {any[]}
 */
module.exports = require('./curry2') (

    function intersection(list1, list2) {

        list1 = toarray(list1);
        list2 = toarray(list2);

        if( list2.length < list1.length ) [list1, list2] = [list2, list1];

        const iscommon = list1.includes.bind(list1);
        const commonitems = list2.filter(iscommon);

        return uniq(commonitems);
    }
)

function toarray(value) {
    return isarray(value) ? value : [value];
}
