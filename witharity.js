/**
 * @module witharity
 */

'use strict';

/**
 * Return a function that always passes *arity* number of its arguments to *func*, no more and no less.
 * Use `witharity()` to ensure that a function is always passed the specified
 * number of arguments. 
 * 
 * Regardless of *arity*'s value, the returned function itself will report a `length` of `0` since it uses a spread
 * parameter in its own parameter list.
 * 
 * The returned function is not curried by default. If the *func* argument is curried and you want to maintain the curry
 * after applying `witharity()`, you must curry the returned function yourself.
 * 
 * `witharity()` itself is curried by default.
 * 
 * @func witharity
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {number} arity The arity to apply
 * @param {function} func The function to apply the arity to
 * @returns {function}
 */

module.exports = require('./curry2')(witharity)

function witharity(arity, func) {

    return function _witharity(...args) {

        const argcount = args.length;
        args.length = arity;

        if( argcount < arity ) args = Array.from(args);

        return func(...args);
    }
}
