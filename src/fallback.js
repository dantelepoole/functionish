/**
 * @module fallback
 */

'use strict';

const ERROR_NONE = undefined;
const RESULT_NONE = undefined;

/**
 * Return a function that passes its arguments to each *func* in order and returns the return value
 * of the first function that does not throw an error. If all *funcs* throw, the returned function itself
 * throws the error thrown by the last function in the *funcs* array.
 * 
 * If the *funcs* array is empty, the returned function returns `undefined`.
 * 
 * @example <caption>Example usage of `fallback()`</caption>
 * 
 * const { fallback } = require('functionish');
 * 
 * function getuserfromcache(userid) { ... }
 * function getuserfromdb(userid) { ... }
 * function anonymoususer() { ... }
 * 
 * const getuser = fallback(getuserfromcache, getuserfromdb, anonymoususer);
 * 
 * // query the cache for userid 42. If the cache throws, query the database. If the database
 * // throws, return an anonymous user object.
 * getuser(42);
 * 
 * @function fallback
 * @param {...function[]} funcs The array of functions to run in order
 * @returns {any}
 */
function fallback(...funcs) {

    return function _fallbackfunctions(...args) {

        let result = args[0];
        let error = ERROR_NONE;

        for(let i = 0; i < funcs.length; i += 1) {

            [result, error] = safeinvoke(funcs[i], args);

            if( !error ) return result;
        }

        if(error) throw error;

        return result;
    }
}

function safeinvoke(func, args) {

    try {
        return [ func(...args), ERROR_NONE ];
    } catch(error) {
        return [ RESULT_NONE, error ];
    }
}

module.exports = fallback;