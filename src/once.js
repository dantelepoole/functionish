/**
 * @module once
 */

'use strict';

const always = require('./always');
const isfunction = require('./isfunction');
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

    isfunction(func) || (func = resolvefunction(func));

    let oncefunc = function (...args) {

        const result = func(...args);

        oncefunc = always(result);

        return result;
    }

    return (...args) => oncefunc(...args);
}