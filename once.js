/**
 * @module once
 */

'use strict';

/**
 * Return a function that passes its arguments to *func* on its first invocation and caches the result. On subsequent
 * invocations, the cached result is returned without calling *func* again.
 * 
 * This is not the same as a memoize-function, because `once()` always returns the cached result on subsequent
 * invocations, even if passed different arguments.
 * 
 * @func once
 * @param {function} func The function to run
 * @returns {function}
 */
module.exports = function once(func) {

    let cache = undefined;

    return function oncefunction(...args) {

        if (cache === undefined) cache = { value:func(...args) };

        return cache.value;
    }
}