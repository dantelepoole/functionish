/**
 * @module guard
 */

'use strict';

const TYPE_FUNCTION = 'function';

const callable = require('./callable');
const curry = require('./curry');

/**
 * Pass *args* to the *func* function and return the result. If *func* throws, invoke the *onerror* and return the
 * result. If *onerror* is not a function, return *onerror*'s value instead.
 * 
 * If *onerror* is a function, it is invoked with two arguments: the thrown error and the *args* array.
 * 
 * `guard()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `guard()`</caption>
 * 
 * const { guard } = require('functionish');
 * 
 * function loaduserfromdb(userid) { ... }
 * 
 * function onuserloaderror(error, args) {
 *    console.error(`Error loading user with userid`, args[0])
 *    console.error(error);
 *    return null;
 * }
 * 
 * const getuser = guard(onerror, loaduserfromdb);
 * 
 * getuser(42);
 * 
 * @function guard
 * @param {(function|any)} onerror The function to call or the value to return if *func* throws
 * @param {function} func The function to run
 * @param  {...any} args The argument to pass to *func*
 * @returns {any}
 */
function guard(onerror, func) {

    onerror = callable(onerror);

    return function _guarded(...args) {

        try {
            return func.call(this, ...args);
        } catch(error) {
            return onerror.call(this, error, args)
        }
    }
}

module.exports = curry(1, guard);