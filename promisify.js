/**
 * @module promisify
 */

'use strict'

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

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
module.exports = NAMED_FUNCTIONS ? promisify_named : promisify;

function promisify(func, ...preboundargs) {

    return function promisified(...args) {
        return papply(func, ...preboundargs, ...args);
    }
}

function promisify_named(func, ...preboundargs) {

    const promisifiedname = `promisified ${func.name}`;

    const container = {
        [promisifiedname] : function (...args) {
            return papply(func, ...preboundargs, ...args);
        }
    
    }

    return container[promisifiedname];
}