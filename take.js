/**
 * @module take
 */

'use strict';

const isslicable = value => (typeof value?.slice === 'function');

/**
 * If *list* has a `slice()` method, call it with *count* and return the result. Otherwise, return an array containing
 * *list* as its only item.
 * 
 * If *count* is negative, an empty array is returned.
 * 
 * `take()` is curried by default.
 * 
 * @func take
 * @param {number} count The number of items to take from *list*
 * @param {(any[]|string|any)} list The list to take the items from
 * @returns {(any[]|string)}
 */
module.exports = require('./curry2')(

    function take(count, list) {

        count = Math.max(0, count);

        return isslicable(list) ? list.slice(0, count) : [list];

    }
)