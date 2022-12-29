/**
 * @module collections/tail
 */

'use strict';

/**
 * Return a copy of *slicable* without the first element. This function calls
 * *slicable*'s slice()-method.
 * 
 * @func tail
 * @param {slicable} slicable An object with a `slice()` method.
 * @returns {any}
 */
module.exports = function tail(slicable) {
    return slicable.slice(1);
}