/**
 * @module collections/count
 */

'use strict';

/**
 * Count the number of items in the argument *countable*. This function returns the value of *countable*'s
 * `length` property or, if the `length` property is undefined, the value of the *countable*'s `size`
 * property. If the `size` property is also `undefined`, the return value is `NaN`.
 * 
 * @func count
 * @param {object} countable An object with a `length` or `size` property
 * @returns {number}
 */
module.exports = function count(countable) {
    return (countable?.length ?? countable?.size ?? NaN);
}