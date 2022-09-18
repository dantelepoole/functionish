/**
 * @module attempt
 */

'use strict';

const evaluate = require('./evaluate');

/**
 * Pass *args* to the *func* function and return the result. If *func* throws, invoke the *errorhandler* and return the
 * result. If *errorhandler* is not a function, return *errorhandler*'s value instead.
 * 
 * If *errorhandler* is a function, it is invoked with two arguments: the thrown error and the *args* array.
 * 
 * @function attempt
 * @param {(function|any)} errorhandler The function to call or the value to return if *func* throws
 * @param {function} func The function to run
 * @param  {...any} args The argument to pass to *func*
 * @returns {any}
 */
module.exports = function attempt(errorhandler, func, ...args) {

    try {
        return func.call(this, ...args);
    } catch(error) {
        return evaluate(errorhandler, error, args);
    }
}
