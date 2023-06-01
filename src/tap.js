/**
 * @module tap
 */

'use strict';

const curry = require('./curry');

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

    const curryarity = func.curryarity - partialargs.length;

    return (curryarity > 0)
         ? curry(curryarity, _tapped)
         : _tapped;
         
    function _tapped(...args) {

        func.call(this, ...partialargs, ...args);

        return args[0];
    }

}

module.exports = tap;