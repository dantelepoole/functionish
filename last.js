'use strict';

const isindexable = require('./isindexable');
const isiterable = require('./isiterable');

/**
 * Return the last item in *list* or `undefined` if *list* is empty. If *list* is neither an array nor an iterable
 * object, *list* itself is returned.
 * 
 * @module last
 * @param {(array|iterable|any)} list The list to get the last item from
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

    return isindexable(list) ? list[ list.length - 1 ]
         : isiterable(list) ? [...list][ list.length - 1 ]
         : list;
}
