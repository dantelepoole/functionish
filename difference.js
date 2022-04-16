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
 * @param {(any[]|any)} list1 The first list
 * @param {(any[]|any)} list2 The second list
 * @returns {any[]}
 */

module.exports = require('./curry2') (

    function difference(list1, list2) {

        const list2set = new Set(list2);
        const differentitems = [];

        function addifdistinct(item) {
            if( ! list2set.has(item) ) differentitems.push(item)
        }

        list1.forEach(addifdistinct);

        return uniq(differentitems);
    }
)