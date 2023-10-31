/**
 * @module fallback
 */

'use strict';

const THIS_NULL = null;

const id = require('./id');
const isdefined = require('./types/isdefined');
const isvoid = require('./types/isvoid');

/**
 * Return a function that passes its arguments to each *func* in order and returns the return value
 * of the first function that does not throw an error or return a <abbr title="null, undefined or NaN">void</abbr>
 * value. If the last *func* throws, the returned function also throws. If the last *func* returns a
 * <abbr title="null, undefined or NaN">void</abbr> value, the returned function returns `undefined`.
 * 
 * If the *funcs* array is empty, the returned function returns its first argument.
 * 
 * [to do: this]
 * 
 * @example <caption>Example usage of `fallback()`</caption>
 * 
 * 
 * [to do]
 * 
 * @function fallback
 * @param {...function[]} funcs The array of functions to run in order
 * @returns {any}
 */
function fallback(...funcs) {

    const finalfunc = funcs.pop() ?? id;

    return runfallback.bind(THIS_NULL, finalfunc, funcs);
}

function runfallback(finalfunc, funcs, ...args) {

    let result = undefined;

    for(let i = 0; isvoid(result) && (i < funcs.length); i += 1) {
        result = attempt(funcs[i], args);
    }

    return isdefined(result) ? result : finalfunc(...args);
}

function attempt(func, args) {

    try {
        return func(...args);
    } catch (error) {
        /* noop */
    }

}

module.exports = fallback;