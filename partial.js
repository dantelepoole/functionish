/**
 * @module partial
 */

'use strict';

const ERR_BAD_FUNC = `PartialError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Bind the *args* to the *func*-function. This function simply calls *func*'s `bind()` method, but does not provide
 * for also passing a value for *func*'s `this`. However, the returned partially applied function may be called with
 * (or bound to) a custom `this`.
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
 * 
 * @func partial
 * @param {function} func The function to partially apply
 * @param  {...any} args One or more arguments to partially apply *func* with
 * @returns {function}
 */
module.exports = function partial(func, ...boundargs) {
    
    if( typeof func !== 'function' ) fail(ERR_BAD_FUNC, typeorclass(func));

    return function partial_(...args) {
        return func.call(this, ...boundargs, ...args);
    }
}
