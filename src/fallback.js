/**
 * @module fallback
 */

'use strict';

const id = require('./id');
const isdefined = require('./types/isdefined');
const isempty = require('./arrays/isempty');

/**
 * Return a function that passes its arguments to each *func* in order and returns the return value
 * of the first function that does not throw an error or return a <abbr title="null, undefined or NaN">void</abbr>
 * value. If the last *func* throws, the returned function also throws. If the last *func* returns a
 * <abbr title="null, undefined or NaN">void</abbr> value, the returned function returns `undefined`.
 * 
 * If the *funcs* array is empty, the returned function returns its first argument.
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

    if( isempty(funcs) ) return id;

    const lastfallback = funcs.pop();

    return function _fallback(...args) {

        for(let i = 0; i < funcs.length; i += 1) {

            try {

                const result = funcs[i].call(this, ...args);
                if( isdefined(result) ) return result;

            } catch(error) {
                // no-op
            }
        }

        return lastfallback.call(this, ...args);
    }
}

module.exports = fallback;