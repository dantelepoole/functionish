/**
 * @module once
 */

'use strict';

const always = require('./always');

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
 * @param {function} targetfunc The function to run
 * @returns {function}
 */
function once(targetfunc) {

    let oncefunc = (...args) => (oncefunc = always( targetfunc(...args) ))();

    return (...args) => oncefunc(...args);

}

module.exports = once;