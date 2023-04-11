/**
 * @module attempt
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry = require('./curry');

/**
 * Pass *args* to the *func* function and return the result. If *func* throws, invoke the *errorhandler* and return the
 * result. If *errorhandler* is not a function, return *errorhandler*'s value instead.
 * 
 * If *errorhandler* is a function, it is invoked with two arguments: the thrown error and the *args* array.
 * 
 * `attempt()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `attempt()`</caption>
 * 
 * const { attempt } = require('functionish');
 * 
 * function loaduserfromdb(userid) { ... }
 * 
 * function onuserloaderror(error, args) {
 *    console.error(`Error loading user with userid`, args[0])
 *    console.error(error);
 *    return null;
 * }
 * 
 * const getuser = attempt(onerror, loaduserfromdb);
 * 
 * getuser(42);
 * 
 * @function attempt
 * @param {(function|any)} errorhandler The function to call or the value to return if *func* throws
 * @param {function} func The function to run
 * @param  {...any} args The argument to pass to *func*
 * @returns {any}
 */
function attempt(errorhandler, func) {

    return function _attempt(...args) {

        try {

            return func.call(this, ...args);
            
        } catch(error) {

            return (typeof errorhandler === TYPE_FUNCTION)
                 ? errorhandler(error, args)
                 : errorhandler;
        }
    }
}

module.exports = curry(1, attempt);