/**
 * @module reverse
 */

'use strict';

const isarray = require('./isarray');

/**
 * If *list* is an array, return a new array with *list*'s items in reverse order. Otherwise, presume *list* is iterable
 * and return an iterable that produces *list*'s items in reverse order.
 * 
 * @func reverse
 * @param {(any[]|iterable)} list The array or iterable of items to reverse
 * @returns {(any[]|iterable)}
 */
module.exports = function reverse(list) {
    return isarray(list) ? list.slice().reverse() : reverseiterable(list);
}

function reverseiterable(list) {

    return {
        [Symbol.iterator] : function* () {

            const items = Array.from(list);
            for( let index = items.length - 1; index >= 0; index -= 1) yield items[index];
        }
   }
}