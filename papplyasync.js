/**
 * @module papplyasync
 */

'use strict';

/**
 * Pass *args* to the *func* function and return a Promise that resolves (or rejects) with the result.
 * This function returns a Promise that resolves or rejects with the result of calling *func*, regardless of whether
 * *func* runs synchronously or asynchronously. 
 * 
 * The *func* is not invoked immediately but from the microtask queue.. If you need a papply() that invokes *func*
 * immediately instead of waiting for the microtask queue to be executed, see {@link module:papply papply()}.
 * 
 * @example
 * 
 * const papplyasync = require('functionish/papplyasync');
 * 
 * function sum(a,b) {
 *   console.log(`sum() called with arguments ${a} and ${b}`);
 *   return (a+b);
 * }
 * 
 * papplyasync(sum, 42, 1)
 *   .then( num => console.log(`result:`, num) );
 * 
 * console.log('starting');
 * 
 * // prints:
 * //    starting
 * //    sum() called with arguments 42 and 1
 * //    result: 43
 * 
 * @func papplyasync
 * @see {@link module:papply papply()}
 * @param {function} func The function to run
 * @param  {...any} [args] The optional arguments to pass to *func*
 * @returns {promise}
 */
module.exports = function papplyasync(func, ...args) {

    const executor = executorfactory(func, ...args);
    
    return new Promise(executor);
}
 
function executorfactory(func, ...args) {

    return function executor(resolve, reject) {

        queueMicrotask(

            function papplyasync_microtask() {

                try {
                    const result = func(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        )
    }

}