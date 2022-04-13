/**
 * @module symmetricdifference
 */

'use strict';

const difference = require('./difference');

/**
 * Return an array with only those items that are present in either *list1* or *list2*, but not both. The returned
 * array will not contain any duplicates. 
 * 
 * `symmetricdifference()` is curried by default.
 * 
 * @func symmetricdifference
 * @param {any[]} list1 The first array
 * @param {any[]} list2 The second array
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