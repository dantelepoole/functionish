/**
 * @module binary
 */

'use strict';

/**
 * More specifically, return a function that accepts exactly two arguments
 * and passes them both *func*, effectively coercing *func* to have exactly two arguments.
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
    return (a,b) => func(a, b);
}

module.exports = binary;