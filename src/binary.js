/**
 * @module binary
 */

'use strict';

const TYPE_STRING = 'string';

const loadfunction = require('./loadfunction');

/**
 * Coerce *func* to have have binary arity. More specifically, return a function that accepts exactly two parameters
 * and passes them both *func*. Any other arguments passed to the returned function are ignored.
 * 
 * `binary()` does not preserve currying, so the returned function is never curried, even if *func* has
 * been curried.
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

    const _binary = (typeof func === TYPE_STRING)
                  ? binary( loadfunction(func) )
                  : (a,b) => func(a,b);

    return _binary;
}

module.exports = binary;