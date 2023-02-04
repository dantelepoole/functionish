/**
 * @module collections/slice
 */

'use strict';

const isslicable = slicable => (typeof slicable?.slice === 'function');

/**
 * Functional variant of the Javascript `slice()` method for strings, array and TypedArrays. This function works
 * with all iterable objects. If the *slicable* argument has a `slice()`-method, that method is called. Otherwise,
 * if the *slicable* is iterable, it is loaded into array before calling the `slice()` method. If *slicable* is
 * neither slicable nor iterable, an error is thrown.
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
 * @param {iterable} slicable An iterable object
 * @returns {array}
 */
module.exports = function slice(start, end, slicable) {

    const argcount = arguments.length;

    [slicable, start, end] = (argcount === 1) ? [start, 0, Number.MAX_SAFE_INTEGER]
                           : (argcount === 2) ? [end, (start ?? 0), Number.MAX_SAFE_INTEGER]
                           : [slicable, (start ?? 0), (end ?? Number.MAX_SAFE_INTEGER)];

    return isslicable(slicable) ? slicable.slice(start, end)
                                : Array.from(slicable).slice(start, end);
}

