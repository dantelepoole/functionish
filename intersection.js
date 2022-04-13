/**
 * @module intersection
 */

'use strict';

const uniq = require('./uniq');

/**
 * Return a list containing all elements common to both *list1* and *list2*. The returned array will not contain any
 * duplicates.
 * 
 * `intersection()` is curried by default.
 * 
 * @func intersection
 * @param {any[]} list1 The first list
 * @param {any[]} list2 The second list
 * @returns {any[]}
 */
module.exports = require('./curry2') (

    function intersection(list1, list2) {

        if( list2.length < list1.length ) [list1, list2] = [list2, list1];

        const iscommon = list1.includes.bind(list1);
        const commonitems = list2.filter(iscommon);

        return uniq(commonitems);
    }
)
