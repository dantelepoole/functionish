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
 * @param {...any[]} partialargs Optional arguments to partial apply to *func*
 * @returns {function}
 */
function tap(func, ...partialargs) {

    return function _tappedfunction(...args) {

        func.call(this, ...partialargs, ...args);

        return args[0];
    }

}

module.exports = tap;