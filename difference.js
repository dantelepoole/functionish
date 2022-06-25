/**
 * @module difference
 */

'use strict';

const bind = require('./bind');
const isarray = require('./isarray');
const not = require('./not');
// const uniq = require('./uniq');

const isarrayorstring = value => (typeof value === 'string' || isarray(value));

/**
 * Return an iterable producing only those items from *list1* that are not present in *list2*, but without duplicates.
 * 
 * `difference()` is curried by default with binary arity.
 * 
 * @func difference
 * @param {iterable} list2 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function difference(list1, list2) {

        const itemcache = new Set(list2);
        const isuniq = item => (itemcache.size < itemcache.add(item).size);

        return {
            [Symbol.iterator] : function* () {
                for(const item of list1) if( isuniq(item) ) yield item;
            }
        }
    }
)
