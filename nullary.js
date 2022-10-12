/**
 * @module nullary
 */

'use strict';

const resolvefunction = require('./resolvefunction');

/**
 * Coerce *func* to have nullary arity. More specifically, return a function that ignores its arguments and calls
 * *func* without any arguments.
 * 
 * @func nullary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {function} func The function to invoke without arguments
 * @returns {function}
 */

module.exports = function nullary(func) {

    func = resolvefunction(func);

    return function nullaryfunction() {
        return func.call(this);
    }
}