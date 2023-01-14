/**
 * @module fallback
 */

'use strict';

const ALWAYS_UNDEFINED = undefined;
const FUNCTION_NONE = undefined;
const RESULT_ERROR = Symbol();

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
    return funcs.reduceRight(fallbackreducer, FUNCTION_NONE) ?? ALWAYS_UNDEFINED;
}

function fallbackreducer(f,g) {

    if( f === FUNCTION_NONE ) return g;

    return function _fallback(...args) {

        const result = safeinvoke(g, args);

        return (result === RESULT_ERROR) ? f(...args) : result;
    }
}

function safeinvoke(func, args) {

    try {
        return func(...args);
    } catch(error) {
        return RESULT_ERROR;
    }
}

module.exports = fallback;