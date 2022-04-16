/**
 * @module difference
 */

'use strict';

const uniq = require('./uniq');

/**
 * Return a list only those items from *list1* that are not present in *list2*. The returned array will not contain any
 * duplicates. 
 * 
 * `difference()` is curried by default.
 * 
 * @func difference
 * @param {(any[]|iterable)} list1 The first list
 * @param {(any[]|iterable)} list2 The second list
 * @returns {any[]}
 */

module.exports = require('./curry2') (

    function difference(list1, list2) {

        const list2set = new Set(list2);
        const result = [];

        for( const item of list1 ) {
            if( ! list2set.has(item) ) result.push(item)
        }

        return uniq(result);
    }
)