/**
 * @module lists/reverse
 */

'use strict';

const EMPTY_STRING = '';

const isarray = require('../types/isarray');
const isstring = require('../types/isstring');

/**
 * If *list* is a string, return it with its characters in reverse order.
 * 
 * If *list* is an array, return a new array with its items in reverse order. The argument
 * array is not changed.
 * 
 * Otherwise, presume *list* is iterable and returns an iterable object that generates its
 * items in reverse order. The returned list operates semi-lazily: it needs to load the argument list
 * into memory entirely, but does so only when you start iterating the returned list.
 * 
 * @function reverse
 * @param {(iterable|string)} list An iterable object producing the items to reverse, or a string
 * @returns {(iterable|string)}
 */
function reverse(list) {

    return isstring(list) ? list.split(EMPTY_STRING).reverse().join(EMPTY_STRING)
         : isarray(list) ? list.slice().reverse()
         : reverseiterable(list);
}

function reverseiterable(list) {

    return {

        [Symbol.iterator] : function* () {

            const items = Array.from(list);

            for(let i = items.length - 1; i >= 0; i -= 1) yield items[i];
        }
   }
}

module.exports = reverse;