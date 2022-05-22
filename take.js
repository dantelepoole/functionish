/**
 * @module take
 */

'use strict';

const isarray = require('./isarray');
const isstring = require('./isstring');

/**
 * Return an array with the first *count* number of items from *iterable*. If *iterable* is a string, a string with
 * the first *count* number of characters from *iterable* is returned instead of an array.
 * 
 * If *count* is negative, an empty array (or string) is returned.
 * 
 * `take()` is curried by default.
 * 
 * @func take
 * @param {number} count The number of items to take from *list*
 * @param {iterable} list The iterable to take the items from
 * @returns {(iterable|string)} A string if *iterable* is a string, otherwise an array.
 */
module.exports = require('./curry2')(

    function take(count, iterable) {

        count = Math.max(0, count);

        return isarray(iterable) || isstring(iterable) ? iterable.slice(0, count)
             : takeiterable(count, iterable);

    }
)

function takeiterable(itemcount, iterable) {

    const array = [];
    let count = 0;

    for( const item of iterable ) {

        if( count >= itemcount ) break;

        array.push(item);
        count += 1;
    }

    return array;
}