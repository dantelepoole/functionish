/**
 * @module pipe
 */

'use strict';

const THIS_NULL = null;

const id = require('./id');

const bipipe = (f, g) => (...args) => g( f(...args) );

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

    return (funcs.length > 2 && _pipe.bind(THIS_NULL, funcs.shift(), funcs))
            ||
           (funcs.length === 2 && bipipe(funcs[0], funcs[1]))
            ||
           (funcs[0] ?? id);
}

function _pipe(firstfunc, funcs, ...args) {

    let result = firstfunc(...args);

    for(let index = 0; index < funcs.length; index += 1) result = funcs[index](result);

    return result;
}

module.exports = pipe;