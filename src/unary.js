/**
 * @module unary
 */

'use strict';

/**
 * Return a function that accepts exactly one parameter and passes it to *func*. Any other arguments
 * passed to the returned function are ignored.
 * 
 * `unary()` does not preserve currying, so the returned function is never curried, even if *func* has
 * been curried.
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
function unary(func) {
    return x => func(x);
}

module.exports = unary;