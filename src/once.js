/**
 * @module once
 */

'use strict';

const VIRGIN_RESULT = Symbol();

const curryfunction = require('../lib/curryfunction');

/**
 * Return a function that passes its arguments to *func* on its first invocation and caches the result. On subsequent
 * invocations, the cached result is returned without calling *func* again.
 * 
 * This is not the same as a memoize-function, because `once()` always returns the cached result on subsequent
 * invocations, even if passed different arguments.
 * 
 * @function once
 * @param {function} func The function to run
 * @returns {function}
 */
function once(func) {

    let result = VIRGIN_RESULT;

    const _once = (...args) => (result === VIRGIN_RESULT)
                             ? (result = func(...args))
                             : result;

    return func.arity
         ? curryfunction(func.arity, _once)
         : _once;
}

module.exports = once;