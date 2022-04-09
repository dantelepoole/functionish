/**
 * Coerce *func* to have have unary arity. More specifically, return a function that accepts exactly one parameter
 * and passes it to *func*. Any other arguments passed to the returned function are ignored.
 * 
 * Be aware that that the returned function is *not* curried by default. If *func* is curried and you want to maintain
 * the currying, you need to curry the returned function yourself.
 * 
 * `unary()` itself is curried by default.
 * 
 * @module unary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {function} func The function to invoke with a single argument
 * @returns {function}
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

module.exports = NAMED_FUNCTIONS ? unary_named : unary;

function unary(func) {

    return function _unary(x) {
        return func(x);
    }
}

function unary_named(func) {

    const unary_name = `unary ${func.name}`;

    const container = {
        [unary_name] : function (x) {
            return func(x);
        }
    }

    return container[unary_name];
}