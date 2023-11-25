/**
 * @module trycatch
 */

'use strict';

const ERR_BAD_TARGETFUNCTION = `functionish/flip(): The target function has type '%s'. Expected a function.`;

const curry1 = require('./curry1');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

/**
 * Return a function that passes its arguments *targetfunc* and returns the result. If *targetfunc* throws, *onerror*
 * is called.
 * 
 * If *onerror* is a function, it is three arguments: the thrown value, *targetfunc* and the array of arguments passed
 * to *targetfunc* when it threw. If *onerror* is not a function, its value is returned directly.
 * 
 * `trycatch()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `trycatch()`</caption>
 * 
 * const { trycatch } = require('functionish');
 * 
 * const onerror = (err,func,args) = { console.error(err.message, func.name, args); return 'fubar' }
 * const dosomething = () => { throw new Error('something went wrong') }
 * 
 * const result = trycatch(onerror, dosomething, 42);
 * // prints 'something went wrong', 'dosomething', [42]
 * // result = 'fubar'
 * 
 * @function trycatch
 * @param {any} onerror The function to call or the value to return if *targetfunc* throws
 * @param {function} targetfunc The function to run
 * @returns {any} function
 * @throws {TypeError} if *targetfunc* is not a function
 */
const trycatch = curry1(function trycatch(onerror, targetfunc) {

    validatetargetfunction(targetfunc);

    return _trycatch.bind(null, onerror, targetfunc);
})

function _trycatch(onerror, targetfunc, ...args) {

    try {
        return targetfunc(...args);
    } catch(error) {
        
        return isfunction(onerror)
             ? onerror(error, targetfunc, args)
             : onerror;
    }

}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

module.exports = trycatch;