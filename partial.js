/**
 * @module partial
 */

'use strict';

const CONTEXT_NONE = null;

const resolvefunction = require('./resolvefunction');

/**
 * Bind the *boundargs* to the *func*-function. Although `partial()` does not allow you to also pass a custom
 * `this`-object, the returned function itself may still be called with (or bound to) a custom `this`.
 *  
 * @example
 * 
 * const partial = require('functionish/partial')
 * 
 * function sum(a,b) {
 *     return (a+b)
 * }
 * 
 * const increment = partial(sum, 1);
 * increment(42); // returns 43
 * 
 * @func partial
 * @param {function} func The function to partially apply
 * @param  {...any} boundargs Zero or more arguments to partially apply *func* with
 * @returns {function}
 */
module.exports = function partial(func, ...boundargs) {
    return resolvefunction(func).bind(CONTEXT_NONE, ...boundargs);
}
