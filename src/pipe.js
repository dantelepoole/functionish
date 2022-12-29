/**
 * @module pipe
 */

'use strict';

const PIPE_NONE = undefined;

const pipereducer = (f,g) => f ? (...args) => g( f(...args) ) : g;

/**
 * Return a function that feeds its arguments to the first function in *funcs*, then passes the result to the second
 * function in *funcs*, and so on, until all functions in *funcs* have been called, after which it returns the last
 * function's result.
 * 
 * @example
 * 
 * const pipe = require('functionish/pipe');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = pipe(negate, double, increment);
 * 
 * allthree(42); // returns `-83`
 * 
 * @func pipe
 * @see {@link module:compose compose()}
 * @param  {...function} funcs One or more functions to chain together
 * @returns {function}
 */

module.exports = function pipe(...funcs) {
    return funcs.reduce(pipereducer, PIPE_NONE) ?? id;
}