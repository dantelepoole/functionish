/**
 * @module unary
 */

'use strict';

const ERR_BAD_FUNCTION = `UnaryError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Coerce *func* to have have unary arity. More specifically, return a function that accepts exactly one parameter
 * and passes it to *func*. Any other arguments passed to the returned function are ignored.
 * 
 * Be aware that that the returned function is *not* curried by default. If *func* is curried and you want to maintain
 * the currying, you need to curry the returned function yourself.
 * 
 * @func unary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {function} func The function to invoke with a single argument
 * @returns {function}
 */

module.exports = function unary(func) {

    if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));

    return function unary_(x) {
        return func(x);
    }
}