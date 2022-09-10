/**
 * @module once
 */

'use strict';

const VIRGIN_RESULT = Symbol();

const resolvefunction = require('./resolvefunction');

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

    func = resolvefunction(func);

    let returnvalue = VIRGIN_RESULT;

    return function oncefunction(...args) {
        return (returnvalue !== VIRGIN_RESULT) ? returnvalue : (returnvalue = func.call(this, ...args));
    }
}