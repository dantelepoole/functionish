/**
 * @module last
 */

'use strict';

const isindexable = require('./isindexable');

/**
 * Return the last item in *list* or `undefined` if *list* is empty. If *list* is not an array, *list* itself is
 * returned.
 * 
 * @func last
 * @param {(any[]|any)} list The list to get the last item from
 * @returns {any}
 * @example
 *     
 * const last = require('functionish/last');
 * 
 * last([1,2,3]); // returns 3
 * last(1); // returns 1
 * last([]); // returns `undefined`
 * 
 */
module.exports = function last(list) {
    return isindexable(list) ? list[ list.length - 1 ] : list;
}
