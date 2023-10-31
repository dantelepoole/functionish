/**
 * @module trycatch
 */

'use strict';

const THIS_NULL = null;

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
 * @param {function} targetfunc The function to run
 * @returns {any}
 */
function trycatch(onerror, targetfunc) {
    return _trycatch.bind(THIS_NULL, onerror, targetfunc);
}

function _trycatch(errorhandler, targetfunc, ...args) {

    try {
        return targetfunc(...args);
    } catch(error) {
        
        return isfunction(errorhandler)
             ? errorhandler(error, targetfunc, args)
             : errorhandler;
    }

}

module.exports = curry(1, trycatch);