/**
 * @module reverse
 */

'use strict';

/**
 * Return a shallow copy of list with its items in reverse order.
 * 
 * @func reverse
 * @param {any[]} list The array of items to reverse
 * @returns {any[]}
 */
module.exports = function reverse(list) {
    return list.slice().reverse();
}
