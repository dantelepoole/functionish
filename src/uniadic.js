/**
 * @module uniadic
 */

'use strict';

const isfunction = require('./isfunction');
const resolvefunction = require('./resolvefunction');

/**
 * Return a function that accepts a single argument *list* and invokes the *func* function, passing the list
 * as a spread parameter.
 * 
 * Use this function to convert a variadic function that accepts variable number of arguments to a uniadic function
 * whose parameter list consists of a single parameter, which must be iterable.
 *
 * If the argument passed to the returned function is not an iterable, an error is thrown. If the returned function is
 * called without an argument, *func* is called without arguments.
 * 
 * @example
 * 
 * const uniadic = require('functionish/uniadic');
 * 
 * const max = uniadic(Math.max);
 * 
 * max( [1,2,3] ); // returns 3
 * 
 * @func uniadic
 * @see {@link module:variadic variadic()}
 * @param {function} func The function to apply
 * @param {...any[]} partialargs One or more arguments to partially apply *func* to before passing the argument list
 * @returns {function}
 */
module.exports = function uniadic(func, ...partialargs) {

    isfunction(func) || (func = resolvefunction(func));

    return list => func(...partialargs, ...list);
}