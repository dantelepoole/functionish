/**
 * @module fallback
 */

'use strict';

const isempty = require('./arrays/isempty');
const isvoid = require('./types/isvoid');

const _fallback_empty = x => x;

/**
 * Return a function that passes its arguments to each *func* in order and returns the return value
 * of the first function that does not throw an error or return a <abbr title="null, undefined or NaN">void</abbr>
 * value. If the last *func* throws, the returned function also throws. If the last *func* returns a
 * <abbr title="null, undefined or NaN">void</abbr> value, the returned function returns `undefined`.
 * 
 * If the *funcs* array is empty, the returned function returns `undefined`.
 * 
 * `fallback()` is `this`-aware, so it propagates its `this`-value to each *func* it invokes.
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

    if( isempty(funcs) ) return _fallback_empty;

    const lastfallback = funcs.pop();

    return function _fallback(...args) {

        for(let index = 0; index < funcs.length; index += 1) {

            try {

                const result = funcs[index].call(this, ...args);

                if( isvoid(result) ) continue;

                return result;

            } catch(error) {
                //noop
            }
        }

        return lastfallback.call(this, ...args);
    }
}

module.exports = fallback;