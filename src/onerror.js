/**
 * @module onerror
 */

'use strict';

const curry = require('./curry');
const isfunction = require('./types/isfunction');

/**
 * to do
 * 
 * @example <caption>Example usage of `onerror()`</caption>
 * 
 * to do
 * 
 * @function onerror
 * @param {(function|any)} errorhandler The function to call or the value to return if *func* throws
 * @param {function} func The function to run
 * @returns {any}
 */
function onerror(errorhandler, func, ...partialargs) {

    return function _onerror(...args) {

        try {
            return func.call(this, ...partialargs, ...args);
        } catch(error) {
            return isfunction(errorhandler)
                 ? errorhandler.call(this, error, ...partialargs, ...args)
                 : errorhandler;
        }
    }
}

module.exports = curry(1, onerror);