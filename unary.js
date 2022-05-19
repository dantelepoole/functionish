/**
 * @module unary
 */

'use strict';

/**
 * Coerce *func* to have have unary arity. More specifically, return a function that accepts exactly one parameter
 * and passes it to *func*. Any other arguments passed to the returned function are ignored.
 * 
 * Be aware that that the returned function is *not* curried by default. If *func* is curried and you want to maintain
 * the currying, you need to curry the returned function yourself.
 * 
 * `unary()` itself is curried by default.
 * 
 * @func unary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {function} func The function to invoke with a single argument
 * @returns {function}
 */

module.exports = unary;

function unary(func) {

    return function _unary(x) {
        return func(x);
    }
}