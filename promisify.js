/**
 * @module promisify
 */

'use strict'

const papply = require('./papply');

/**
 * Return a function that passes its arguments (prepended by any *preboundargs* provided to `promisify()`) to *func*
 * and returns the result as a promise.
 * 
 * @example
 * 
 * const promisify = require('functionish/promisify');
 * 
 * function sum(a,b) {
 *    return (a+b);
 * }
 * 
 * const incrementasync = promisify(sum, 1);
 * 
 * incrementasync(42).then(console.log); // prints '43'
 * 
 * @func promisify
 * @param {function} func The function to promisify
 * @param {...any} preboundargs The argument to pre-bind to *func*
 * @returns {function}
 */
module.exports = promisify;

function promisify(func, ...preboundargs) {

    return function promisified(...args) {
        return papply(func, ...preboundargs, ...args);
    }
}
