/**
 * @module once
 */

'use strict';

const EMPTY = Symbol();

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

    let returnvalue = EMPTY;

    const oncename = `once ${func.name}`;

    return {

        [oncename] : function(...args) {
            return (returnvalue !== EMPTY) ? returnvalue : (returnvalue = func.call(this, ...args));
        }
    }[oncename]
}