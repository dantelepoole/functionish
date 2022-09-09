/**
 * @module defer
 */

'use strict';

const ERR_BAD_FUNCTION = `DeferError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const typeorclass = require('./typeorclass');

/**
 * Return a function that call *func* with the specified *args*. This function behaves very similar to
 * {@link module:partial partial()}, except that the deferred function will silently ignore any arguments passed to it.
 * 
 * @example
 * 
 * const defer = require('functionish/defer');
 * 
 * function sum(...numbers) {
 *     return numbers.reduce( (a,b)=>(a+b), 0 )
 * }
 * 
 * const addition = defer(sum, 1, 2);
 * 
 * addition(); // returns 3
 * addition(4); // returns 3
 * 
 * @func defer
 * @param {function} func The function to call
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function}
 */
module.exports = function defer(func, ...args) {

    return isfunction(func) ? function deferredfunction() { return func.call(this, ...args) }
         : fail(ERR_BAD_FUNCTION, typeorclass(func));
}