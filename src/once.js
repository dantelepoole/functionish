/**
 * @module once
 */

'use strict';

const VIRGIN_RESULT = Symbol();

const always = require('./always');
const curry = require('./curry');

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
 * @param {...any[]} partialargs Optional arguments to partially apply to *func*
 * @returns {function}
 */
function once(func, ...partialargs) {

    let result = VIRGIN_RESULT;

    return (...args) => (result === VIRGIN_RESULT)
                      ? (result = func(...partialargs, ...args))
                      : result;
}

module.exports = once;