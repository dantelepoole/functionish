/**
 * @module collections/slice
 */

'use strict';

/**
 * Functional variant of the Javascript `Array.prototype.slice()`. Return a shallow copy of the elements of *array*
 * starting at index *start* (inclusive) and ending at index *end* (exclusive).
 * 
 * This function is overloaded:
 * 
 * 1. `slice(slicable)` : calls `slicable.slice()`
 * 2. `slice(start, slicable)` : calls `slicable.slice(start)`
 * 3. `slice(start, end, slicable)` : calls `slicable.slice(start, end)`
 * 
 * This function also works with Node's `Buffer` instances, but be aware that `Buffer.slice()` does not return a 
 * shallow copy. Instead, the returned Buffer references the same memory as the (specified section) of the input
 * Buffer.
 * 
 * @func slice
 * @param {number} start The index of the first item to include in the slice
 * @param {number} end The index of the item *after* the last item to include in the slice
 * @param {any[]} array The array (or other object with a `slice()` method) to slice
 * @returns {any}
 */
function slice(start, end, array) {

    return (arguments.length === 1) ? start.slice()
         : (arguments.length === 2) ? end.slice(start)
         : array.slice(start, end);
}

module.exports = slice;
