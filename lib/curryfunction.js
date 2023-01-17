/**
 * @module lib/curryfunction
 * @ignore
 */

'use strict';

const CONTEXT_NONE = undefined;
const CURRY_ARITY = Symbol.for('functionish/curryfunction/CURRY_ARITY');

/**
 * If *args* contains at least *arity* number of arguments, pass the *args* to *func* and return the
 * result. Otherwise, return a curried version of *func*, i.e. pre-bound to the *args*.
 * 
 * In the latter case, the returned function will be decorated with symbol-property holding the current
 * arity value for the curried function.
 * 
 * This function is used internally by {@link module:curry curry()} and its related functions. User code
 * should not need to rely on this function directly.
 * 
 * @function curryfunction
 * @see {@link module:curry curry()}
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry
 * @param {...any[]} args The curried arguments to pass to *func*
 * @returns {any}
 */
function curryfunction(arity, func, ...args) {

    if(arity <= args.length) return func(...args);

    const curried = curryfunction.bind(CONTEXT_NONE, arity, func, ...args);

    curried[CURRY_ARITY] = (arity - args.length);

    return curried;
}

module.exports = curryfunction;