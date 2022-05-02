/**
 * @module slice
 */

'use strict';

const isvoid = require('./isvoid');

/**
 * Functional variant of {@link external:Array.prototype.slice Array.prototype.slice()}. Return a shallow copy of
 * the *list* array or string starting at *startindex* up to but including *endindex*. Pass 0, `null`, `undefined` or
 * `NaN` for *endindex* to return a copy of the entire array (i.e. set *endindex* equal to *list*'s length).
 * 
 * @func slice
 * @see {@link external:Array.prototype.slice Array.prototype.slice()}
 * @param {number} startindex The index of the first item to include in the slice
 * @param {number} endindex The index of the item *after* the last item to include in the slice
 * @param {(array|string)} list The string or array of items to slice
 * @returns {any[]}
 */
module.exports = require('./curry3') (slice);

function slice(startindex, endindex, list) {
    return list.slice(startindex, endindex || list.length);
}
