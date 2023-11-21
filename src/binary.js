/**
 * @module binary
 */

'use strict';

/**
 * Return a function that always invokes *targetfunc* with exactly two arguments, regardless of the actual
 * number of arguments it receives. If it receives less than two arguments, it passes `undefined` to
 * *targetfunc* for the missing arguments. If it receives more than two arguments, it passes only the
 * first two arguments and discards the others.
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
 * @param {function} targetfunc The target function
 * @returns {function}
 */
function binary(targetfunc) {
    return (a,b) => targetfunc(a, b);
}

module.exports = binary;