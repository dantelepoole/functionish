/**
 * @module invocable
 */

'use strict';

const resolvefunction = require('./resolvefunction');

/**
 * Return a function that passes its arguments to *func* and returns either *func*'s return
 * value or the error it throws.
 * 
 * @example
 * const invocable = require('functionish/invocable');
 * const iserror = x => (x instanceof Error);
 * 
 * const dosomething = invocable(
 *  function (...args) {
 *      //  ... do something or throw an error
 *  }
 * )
 * const result = dosomething(42);
 * 
 * console.log( 
 *     iserror(result) ? error.toString() : result
 * ) 
 * 
 * 
 * @func invocable
 * @see {@link module:invoke invoke()}
 * @param {function} func The function to invoke 
 * @returns {function}
 */
 
module.exports = function invocable(func) {

    func = resolvefunction(func);

    return function invocablefunc(...args) {
        
        try {
            return func.call(this, ...args);
        } catch(error) {
            return error;
        }
    }
}