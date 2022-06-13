/**
 * @module attempt
 */

'use strict';

const evaluate = require('./evaluate');

module.exports = attempt;

/**
 * Pass *args* to the *func* function and return the result. If *func* throws, invoke the *errorhandler* and return the
 * result. If *errorhandler* is not a function, return *errorhandler*'s value instead.
 * 
 * If *errorhandler* is a function, it is invoked with two arguments: the thrown error and the *args* array.
 * 
 * @param {(function|any)} errorhandler The function to call or the value to return if *func* throws
 * @param {function} func The function to run
 * @param  {...any} args The argument to pass to *func*
 * @returns {any}
 */
function attempt(errorhandler, func, ...args) {

    try {
        return func(...args);
    } catch(error) {
        return evaluate(errorhandler, error, args);
    }
}
