/**
 * @module invoke
 */

'use strict';

const ERROR_NONE = undefined;
const RESULT_NONE = undefined;

/**
 * Pass *args* to *func* and return a 2-element array containing *func*'s return value as the
 * first element and the error it throws (if any) in the second element.
 * 
 * @example <caption>Example usage of `invoke()`</caption>
 * 
 * const { invoke } = require('functionish');
 * 
 * function getuserfromdb(userid) { ... }
 * 
 * const [user, error] = invoke(getuserfromdb, 42);
 * 
 * console.log(error ?? user); // if an error is thrown, print it, otherwise print the user
 * 
 * @function invoke
 * @see {@link module:invocable invocable()}
 * @param {function} func The function to invoke 
 * @param {...any} args The arguments to pass to *func*
 * @returns {any[]}
 */
function invoke(func, ...args) {

    try {
        return [ func(...args), ERROR_NONE ];
    } catch (error) {
        return [ RESULT_NONE, error ];
    }
}

module.exports = invoke;