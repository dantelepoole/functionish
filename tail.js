/**
 * @module tail
 */

'use strict';

/**
 * Return a shallow copy of the *list* array or string without its first item or character.
 * 
 * This function complements the `head()` function, which returns the first item of its argument list.
 * 
 * @func tail
 * @see {@link module:head head()}
 * @param {(any[]|string)} list The string or array of items to return the tail of
 * @returns {(any[]string)}
 */
module.exports = function tail(list) {
    return list.slice(1);
}
