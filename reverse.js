/**
 * @module reverse
 */

'use strict';

const isarray = require('./isarray');

/**
 * Return an iterable object that produces the items from *iterable* in reverse order. Be aware that this function
 * first loads all items into an array before iterating the array in reverse order.
 * 
 * Unlike the `Array.prototype.reverse()` method, this function does not affect the (order of) of the items in the
 * argument if the argument is an array.
 * 
 * @func reverse
 * @param {iterable} iterable The iterable of items to produce in reverse order
 * @returns {iterable}
 */
module.exports = function reverse(iterable) {

    return {
        [Symbol.iterator] : function* () {

            const items = Array.from(iterable);
            for( let index = items.length - 1; index >= 0; index -= 1) yield items[index];
        }
   }
}