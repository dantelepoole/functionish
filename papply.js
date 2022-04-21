/**
 * @module papply
 */

'use strict';

const ispromise = require('util').types.isPromise;

/**
 * Pass *args* to the *func* function and return a Promise that resolves (or rejects) with the result.
 * This function returns a Promise that resolves or rejects with the result of calling *func*, regardless of whether
 * *func* runs synchronously or asynchronously. 
 * 
 * The *func* is invoked immediately. If you need a papply() that defers invoking *func* until the next phase of the
 * event loop (more specifically, from the microtask queue), see {@link module:papplyasync papplyasync()}.
 * 
 * @example
 * 
 * const papply = require('functionish/papply');
 * 
 * function sum(a,b) {
 *   console.log(`sum() called with arguments ${a} and ${b}`);
 *   return (a+b);
 * }
 * 
 * papply(sum, 42, 1)
 *   .then( num => console.log(`result:`, num) );
 * 
 * console.log('starting');
 * 
 * // prints:
 * //    sum() called with arguments 42 and 1
 * //    starting
 * //    result: 43
 * 
 * @func papply
 * @see {@link module:papplyasync papplyasync()}
 * @param {function} func The function to run
 * @param  {...any} [args] The arguments to pass to *func*
 * @returns {promise}
 */
module.exports = function papply(func, ...args) {

    try {
        
        const result = func(...args);
        return ispromise(result) ? result : Promise.resolve(result);

    } catch (error) {
        return Promise.reject(error);
    }
}
