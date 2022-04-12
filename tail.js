/**
 * @module tail
 */

'use strict';

const isslicable = value => (typeof value?.slice === 'function');

/**
 * Return a copy of *list* without its first item. If *list* has a `slice()`-method, call it with an argument of `1`
 * and return the result. Otherwise, return an empty array.
 * 
 * This function complements the `head()` function, which returns the first item of its argument list.
 * 
 * @func tail
 * @see {@link module:head head()}
 * @param {(any[]|string)} list The list of items to return the tail of
 * @returns {(any[]|string)}
 */
module.exports = function tail(list) {
    return isslicable(list) ? list.slice(1) : [];
}
