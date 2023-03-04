/**
 * @module once
 */

'use strict';

const CONTEXT_NONE = null;
const VIRGIN_RESULT = Symbol();

/**
 * Return a function that passes its arguments to *func* on its first invocation and caches the result. On subsequent
 * invocations, the cached result is returned without calling *func* again.
 * 
 * This is not the same as a memoize-function, because `once()` always returns the cached result on subsequent
 * invocations, even if passed different arguments.
 * 
 * [to do:partialargs]
 * 
 * @function once
 * @param {function} func The function to run
 * @returns {function}
 */
function once(func, ...partialargs) {

    if(partialargs.length) func = func.bind(CONTEXT_NONE, ...partialargs);

    let result = VIRGIN_RESULT;

    const _once = (...args) => (result === VIRGIN_RESULT)
                             ? (result = func(...args))
                             : result;

    return _once;
}

module.exports = once;