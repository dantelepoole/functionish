/**
 * @module lib/curryfunction
 * @ignore
 */

'use strict';

const CONTEXT_NONE = undefined;
const DEFAULT_CURRY_ARITY = 1;

/**
 * to do
 * 
 * @function curryfunction
 * @see {@link module:curry curry()}
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry
 * @returns {any}
 */
function curryfunction(arity, func) {

    if( ! (arity > 0) ) arity = DEFAULT_CURRY_ARITY;

    return function _curried(...args) {

        return (arity < args.length) ? func(...args)
             : (arity === args.length) ? func.bind(CONTEXT_NONE, ...args)
             : _curried.bind(CONTEXT_NONE, ...args);
    }
}

module.exports = curryfunction;