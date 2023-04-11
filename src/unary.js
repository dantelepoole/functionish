/**
 * @module unary
 */

'use strict';

/**
 * Return a function that accepts exactly one parameter and passes it to *func*. Any other arguments
 * passed to the returned function are ignored.
 * 
 * @example <caption>Example usage of `unary()`</caption>
 * 
 * const { unary } = require('functionish');
 * 
 * const unarylog = unary(console.log);
 * 
 * unarylog('foobar', 'foobar2'); // prints only 'foobar' to the screen
 * 
 * @function unary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {function} func The function to invoke with a single argument
 * @returns {function}
 */
function unary(func, ...partialargs) {

    return function _unaryfunction(x) {
        return func.call(this, ...partialargs, x);
    }
}

module.exports = unary;