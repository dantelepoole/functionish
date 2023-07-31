/**
 * @module fallback
 */

'use strict';

const id = require('./id');
const notvoid = require('./types/notvoid');

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

    return function _fallback(...args) {
        return _runfallback(this, finalfunc, funcs, args);
    }
}

function _runfallback(thiscontext, finalfunc, funcs, args) {

    for(let i = 0; i < funcs.length; i += 1) {

        const result = attempt(thiscontext, funcs[i], args);

        if( notvoid(result) ) return result;
    }

    return finalfunc.call(thiscontext, ...args);
}

function attempt(thiscontext, func, args) {

    try {
        return func.call(thiscontext, ...args);
    } catch (error) {
        return undefined;
    }

}

module.exports = fallback;