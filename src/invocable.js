/**
 * @module invocable
 */

'use strict';

const invoke = require('./invoke');
const isfunction = require('./isfunction');
const resolvefunction = require('./resolvefunction');
const partial = require('./partial');

/**
 * Return a function that passes its arguments to *func* and returns a 2-element array
 * containing *func*'s return value as the first element and the error it throws (if any) in
 * the second element.
 * 
 * @example
 * const invocable = require('functionish/invocable');
 * 
 * const dosomething = invocable(
 *  function (...args) {
 *      //  ... do something or throw an error
 *  }
 * )
 * const [result, error] = dosomething(42);
 * 
 * console.log( 
 *     error ? error.toString() : result
 * ) 
 * 
 * 
 * @func invocable
 * @see {@link module:invoke invoke()}
 * @param {function} func The function to invoke 
 * @returns {function}
 */
 
module.exports = function invocable(func) {

    isfunction(func) || (func = resolvefunction(func));

    return partial(invoke, func);
}