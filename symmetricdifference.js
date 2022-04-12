/**
 * @module symmetricdifference
 */

'use strict';

const difference = require('./difference');

/**
 * Return a list only those items that are present in either *list1* or *list2*, but not both. The returned array will
 * not contain any duplicates. 
 * 
 * If either list is not an array, it will be converted to a single-item array first.
 * 
 * `symmetricdifference()` is curried by default.
 * 
 * @func symmetricdifference
 * @param {(any[]|any)} list1 The first list
 * @param {(any[]|any)} list2 The second list
 * @returns {any[]}
 */

module.exports = require('./curry2') (

    function symmetricdifference(list1, list2) {

        return [
            ...difference(list1, list2),
            ...difference(list2, list1)
        ]
    }
)