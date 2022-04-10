/**
 * @module binary
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

const curry2 = require('./curry2');

/**
 * Coerce *func* to have have binary arity. More specifically, return a function that accepts exactly two parameters
 * and passes them both *func*. Any other arguments passed to the returned function are ignored.
 * 
 * Be aware that that the returned function is *not* curried by default. If *func* is curried and you want to maintain
 * the currying, you need to curry the returned function yourself.
 * 
 * `binary()` itself is curried by default.
 * 
 * @example
 * 
 * const binary = require('functionish/binary');
 * 
 * const printargs = (...args) => console.log(args);
 * const printargs_binary = binary(printargs);
 * 
 * printargs( 1,2,3,4,5 ); // prints `[1,2,3,4,5]`
 * printargs_binary( 1,2,3,4,5 ); // prints `[1,2]`
 * 
 * @func binary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @param {function} func The function to invoke with two arguments
 * @returns {function}
 */
module.exports = NAMED_FUNCTIONS ? binary_named : binary;

function binary(func) {

    function _binary(a, b) {
        return func(a, b);
    }

    return curry2(_binary);
}

function binary_named(func) {

    const binaryname = `binary ${func.name}`;

    const container = {
        [binaryname] : function (a, b) {
            return func(a, b);
        }
    }

    return curry2( container[binaryname] );
}