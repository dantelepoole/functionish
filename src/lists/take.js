/**
 * @module lists/take
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return an array containing the first *itemcount* items in *list*.
 * 
 * `take()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `take()`</caption>
 * 
 * const { take } = require('functionish/lists');
 * 
 * take(2, [1,2,3,4,5]); // returns [1,2];
 * 
 * @function take
 * @param {number} itemcount The number of items to take from *list*
 * @param {iterable} list The list of items
 * @returns {array[]}
 */
function take(itemcount, list) {

    (itemcount >= 0) || (itemcount = 0);

    return [ ...limitlist(itemcount, list) ];
}

function* limitlist(itemcount, list) {

    for(const item of list) {

        if(itemcount === 0) return;

        itemcount -= 1;

        yield item;
    }
}

module.exports = curry2(take);