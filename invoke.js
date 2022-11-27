/**
 * @module invoke
 */

'use strict';

/**
 * Pass *args* to *func* and return either *func*'s return value or any error it throws.
 * 
 * @example
 * const invoke = require('functionish/invoke');
 * const iserror = x => (x instanceof Error);
 * 
 * function dosomething(value) {
 *     // ... does something or throws an error
 * }
 * 
 * const result = invoke(dosomething, 42);
 * 
 * console.log( 
 *     iserror(result) ? error.toString() : result
 * ) 
 * 
 * 
 * @func invoke
 * @see {@link module:invocable invocable()}
 * @param {function} func The function to invoke 
 * @param {...any} args The arguments to pass to *func*
 * @returns {any} *func*'s return value or the thrown error
 */
 
module.exports = function invoke(func, ...args) {

    try {
        return func.call(this, ...args);
    } catch (error) {
        return error;
    }
}