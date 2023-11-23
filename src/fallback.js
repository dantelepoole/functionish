/**
 * @module fallback
 */

'use strict';

const id = require('./id');
const isdefined = require('./types/isdefined');
const isvoid = require('./types/isvoid');

/**
 * Return a function that passes its arguments to each *func* in order and returns the return value
 * of the first function that does not throw an error or a <abbr title="null or undefined">void</abbr>
 * value.
 * 
 * If the last *func* throws, the returned function also throws. If the last *func* returns a
 * <abbr title="null or undefined">void</abbr> value, the returned function returns `undefined`.
 * 
 * If the *funcs* array is empty, the returned function returns its first argument.
 * 
 * @example <caption>Example usage of `fallback()`</caption>
 * 
 * const { fallback } = require('functionish');
 * 
 * const id = x => x;
 * const throwerror = x => { throw new Error(x) }
 * const fortytwo = () => 42;
 * 
 * const execute = fallback(id, throwerror, fortytwo);
 * 
 * execute(null); // returns 42
 * execute(); // returns 42
 * execute(41); // returns 41
 * 
 * 
 * @function fallback
 * @param {...function[]} targetfuncs The array of functions to run in order
 * @returns {any}
 */
function fallback(...targetfuncs) {

    const finalfunc = targetfuncs.pop() ?? id;

    return runfallback.bind(null, finalfunc, targetfuncs);
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