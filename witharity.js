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
 * @module witharity
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {number} arity The arity to apply
 * @param {function} func The function to apply the arity to
 * @returns {function}
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

module.exports = require('./curry2')(NAMED_FUNCTIONS ? witharity_named : witharity)

function witharity(arity, func) {

    return function _witharity(...args) {

        const arityargs = args.slice(0, arity);

        return func(...arityargs);
    }
}

function witharity_named(arity, func) {

    const witharity_name = `witharity[${arity}] ${func.name}`;

    const container = {
        [witharity_name] : function (...args) {

            const arityargs = args.slice(0, arity);
    
            return func(...arityargs);
        }
    }

    return container[witharity_name];
}
