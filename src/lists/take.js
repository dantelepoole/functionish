/**
 * @module lists/take
 */

'use strict';

/**
 * Return an array containing the first *itemcount* items in *list*.
 * 
 * @example
 * const take = require('functionish/lists/take');
 * 
 * take(2, [1,2,3,4,5]); // returns [1,2];
 * 
 * @function take
 * @param {number} itemcount The number of items to take from *list*
 * @param {iterable} list The list of items
 * @returns {array}
 */
module.exports = function take(itemcount, list) {

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