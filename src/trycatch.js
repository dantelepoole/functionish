/**
 * @module trycatch
 */

'use strict';

const curry = require('./curry');
const isfunction = require('./types/isfunction');

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

    validatefunction(func);

    return function _trycatch(...args) {

        try {
            return func.call(this, ...partialargs, ...args);
        } catch(error) {
            
            return isfunction(onerror)
                 ? onerror.call(this, error, func, [...partialargs, ...args])
                 : onerror;
        }
    }
}


function validatefunction(func) {

    if( isfunction(func) ) return func;

    const errormessage = `trycatch(): The function has type ${typeof func}. Expected a function.`;
    throw new TypeError(errormessage);
}

module.exports = curry(1, trycatch);