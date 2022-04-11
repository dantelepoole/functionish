'use strict';

const isiterable = require('./isiterable');

const isslicable = value => (typeof value?.slice === 'function');

/**
 * If *list* has a `slice()` method, call it with *count* and return the result. If *list* is iterable, return
 * an array containing the first *count* items produced by the iterable. Otherwise, return an array containing *list*
 * as its only item.
 * 
 * If *count* is negative, an empty array is returned.
 * 
 * `take()` is curried by default.
 * 
 * @module take
 * @param {number} count The number of items to take from *list*
 * @param {(array|string|iterable|any)} list The list to take the items from
 * @returns {(array|string)}
 */
module.exports = require('./curry2')(

    function take(count, list) {

        count = Math.max(0, count);

        return isslicable(list) ? list.slice(0, count)
             : isiterable(list) ? iterabletake(list, count)
             : [list];

    }
)

function iterabletake(iterable, count) {

    const buffer = [];

    for( const item of iterable ) {

        if( buffer.length >= count ) break;

        buffer.push(item);
    }

    return buffer;
}