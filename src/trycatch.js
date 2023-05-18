/**
 * @module trycatch
 */

'use strict';

const curry = require('./curry');
const isfunction = require('./types/isfunction');
const safe = require('./safe');

/**
 * to do
 * 
 * @example <caption>Example usage of `trycatch()`</caption>
 * 
 * to do
 * 
 * @function trycatch
 * @param {(function|any)} onerror The function to call or the value to return if *func* throws
 * @param {function} func The function to run
 * @returns {any}
 */
function trycatch(onerror, func, ...partialargs) {

    return function _trycatch(...args) {

        try {
            return func.call(this, ...partialargs, ...args);
        } catch(error) {
            return onerror.call(this, error, [...partialargs, ...args])
        }
    }
}

module.exports = curry(1, trycatch);