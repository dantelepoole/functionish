/**
 * @module pipe
 */

'use strict';

/**
 * Return a function that feeds its arguments to the first function in *funcs*, then passes the result to the second
 * function in *funcs*, and so on, until all functions in *funcs* have been called, after which it returns the last
 * function's result.
 * 
 * If the *funcs* array is empty, the returned function simply returns its first argument.
 * 
 * @example <caption>Example usage of `pipe()`</caption>
 * 
 * const { pipe } = require('functionish');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = pipe(negate, double, increment);
 * 
 * allthree(42); // returns `-83`
 * 
 * @function pipe
 * @see {@link module:compose compose()}
 * @param  {...function} funcs One or more functions to pipe
 * @returns {function}
 */
function pipe(...funcs) {
    return (...args) => runpipedfunctions(funcs, args);
}

function runpipedfunctions(funcs, args) {

    for(let i = 0; i < funcs.length; i += 1) args = [ funcs[i](...args) ];

    return args[0];
}

module.exports = pipe;