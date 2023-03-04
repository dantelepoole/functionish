/**
 * @module tap
 */

'use strict';

const CONTEXT_NONE = null;

/**
 * Return a function that passes its arguments to *func* and returns its own first
 * argument.
 * 
 * [to do: partialargs]
 * 
 * @example <caption>Example usage of `tap()`</caption>
 * 
 * const { tap } = require('functionish');
 * 
 * const log = tap(console.log);
 * 
 * log(42); // prints 42 to the screen and returns 42
 * 
 * @param {function} func The function to tap
 * @param {...any[]} partialargs The arguments to partial apply to *func*
 * @returns {function}
 */
function tap(func, ...partialargs) {

    if (partialargs.length) func = func.bind(CONTEXT_NONE, ...partialargs);

    const _tap = (...args) => ( func(...args), args[0] );

    return _tap;
}

module.exports = tap;