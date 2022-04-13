/**
 * @module last
 */

'use strict';

/**
 * Return the last item in *list* or `undefined` if *list* is empty.
 * 
 * @func last
 * @param {any[]} list The array to get the last item from
 * @returns {any}
 * @example
 *     
 * const last = require('functionish/last');
 * 
 * last([1,2,3]); // returns 3
 * last([]); // returns `undefined`
 * 
 */
module.exports = function last(list) {
    return list[ list.length - 1 ];
}
