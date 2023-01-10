/**
 * @module binary
 */

'use strict';

/**
 * Coerce *func* to have have binary arity. More specifically, return a function that accepts exactly two parameters
 * and passes them both *func*. Any other arguments passed to the returned function are ignored.
 * 
 * The returned function is not curried. If *func* is curried and you want to maintain the curry, you must
 * pass the returned function to {@link module:curry curry()} yourself.
 * 
 * @example <caption>Example usage of `binary()`</caption>
 * 
 * const { binary } = require('functionish');
 * 
 * const printargs_binary = binary( console.log.bind.console );
 * 
 * console.log( 1,2,3,4,5 );      // prints `[1,2,3,4,5]`
 * printargs_binary( 1,2,3,4,5 ); // prints `[1,2]`
 * 
 * @function binary
 * @see {@link module:unary unary()}
 * @param {function} func The target function
 * @returns {function}
 */
function binary(func) {
    return (a,b) => func(a,b);
}

module.exports = binary;