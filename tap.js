/**
 * @module tap
 */

'use strict';

module.exports = tap;

/**
 * Return a function that passes its arguments (preceded by any *preboundargs* passed to `tap()`) but returns its own
 * first argument (ignoring *func*'s return value).
 * 
 * @func tap
 * @param {function} func The function to call
 * @param  {...any} preboundargs The arguments to pre-bind to *func*
 * @returns {any} The first argument passed to the returned function
 */
function tap(func, ...preboundargs) {

    function tappedfunction(...args) {
        func(...preboundargs, ...args);
        return args[0];
    }

    return tappedfunction;
}
