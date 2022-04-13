/**
 * @module slice
 */

'use strict';

/**
 * Functional variant of {@link external:Array.prototype.slice Array.prototype.slice()}. Return a shallow copy of
 * the *list* array or string starting at *startindex* up to but including *endindex*.
 * 
 * @func slice
 * @see {@link external:Array.prototype.slice Array.prototype.slice()}
 * @param {(array|string)} list The string or array of items to slice
 * @param {number} [startindex=0] The index of the first item to include in the slice
 * @param {number} [endindex] The index of the item *after* the last item to include in the slice
 * @returns {any[]}
 */
module.exports = function slice(list, startindex=0, endindex) {
    return list.slice(startindex, endindex);
}
