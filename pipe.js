/**
 * @module pipe
 */

'use strict';

const ERR_BAD_FUNCTION = `PipeError~The function has type %s. Expected a function.`;
const PIPE_NONE = undefined;

const fail = require('./fail');
const id = require('./id');
const isempty = require('./isempty');
const isfunction = require('./isfunction');
const typeorclass = require('./typeorclass');

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
    return isempty(funcs) ? id : funcs.reduce(pipereducer, PIPE_NONE);
}

function pipereducer(currentfunc, nextfunc) {

    isfunction(nextfunc) || fail(ERR_BAD_FUNCTION, typeorclass(nextfunc));

    return (currentfunc === PIPE_NONE) ? nextfunc
         : (...args) => nextfunc( currentfunc(...args) );
}