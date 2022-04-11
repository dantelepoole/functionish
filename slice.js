/**
 * @module slice
 */

'use strict';

const isiterable = require('./isiterable');

const isslicable = value => (typeof value?.slice === 'function' );

/**
 * Function variant of {@link external:Array.prototype.slice Array.prototype.slice()}. If *list* has a `slice()` method,
 * call that method and return the result. Otherwise, if *list* is an iterable object, create an array from it and
 * call the array's `slice()` method. Otherwise, return an empty array.
 * 
 * @func slice
 * @param {(array|string|iterable)} list The list of items to slice
 * @param {number} [startindex=0] The index of the first item to include in the slice
 * @param {number} [endindex] The index of the item *after* the last item to include in the slice
 * @returns {any[]}
 */
module.exports = function slice(list, startindex=0, endindex) {

    return isslicable(list) ? list.slice(startindex, endindex)
        : isiterable(list) ? [...list].slice(startindex, endindex)
        : [];
}
