/**
 * @module collections/take
 */

'use strict';

/**
 * Return a copy of the first *itemcount* elements in *slicable*. This function calls
 * *slicable*'s `slice()` method.
 * 
 * @func take
 * @param {number} itemcount The number of items to take from *list*
 * @param {slicable} slicable An object with a `slice()`-method.
 * @returns {slicable}
 */
module.exports = function take(itemcount, slicable) {
    return slicable.slice(0, itemcount);
}