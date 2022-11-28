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
 * @example
 * const invoke = require('functionish/invoke');
 * 
 * function dosomething(value) {
 *     // ... does something or throws an error
 * }
 * 
 * const [result, error] = invoke(dosomething, 42);
 * 
 * console.log( 
 *     error ? error.toString() : result
 * ) 
 * 
 * @func invoke
 * @see {@link module:invocable invocable()}
 * @param {function} func The function to invoke 
 * @param {...any} args The arguments to pass to *func*
 * @returns {any[]}
 */
 
module.exports = function invoke(func, ...args) {

    try {
        return [ func.call(this, ...args), ERROR_NONE ];
    } catch (error) {
        return [ RESULT_NONE, error ];
    }
}