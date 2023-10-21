/**
 * @module uniadic
 */

'use strict';

const isiterable = require('./types/isiterable');

/**
 * Return a function that accepts an iterable as its only argument and passes the iterable's items to the *func* function
 * as a spread parameter.
 * 
 * Use this function to convert a variadic function that accepts variable number of arguments to a uniadic function
 * whose parameter list consists of a single parameter, which must be iterable.
 *
 * If the argument passed to the returned function is not an iterable, an error is thrown. If the returned function is
 * called without an argument, *func* is called without arguments.
 * 
 * @example <caption>Example usage of `uniadic()`</caption>
 * 
 * const { uniadic } = require('functionish');
 * 
 * const max = uniadic(Math.max);
 * 
 * max( [1,2,3] ); // returns 3
 * 
 * @function uniadic
 * @see {@link module:variadic variadic()}
 * @param {function} func The function to apply
 * @param {...any[]} partialargs One or more arguments to partially apply *func* to before passing the argument list
 * @returns {function}
 */
module.exports = function uniadic(func, ...partialargs) {

    return item => isiterable(item)
                 ? func(...partialargs, ...item)
                 : func(...partialargs, item);
}