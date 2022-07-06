/**
 * @module partial
 */

'use strict';

const ERR_BAD_FUNC = `PartialError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Bind the *args* to the *func*-function. Although `partial()` does not allow you to also pass a custom `this`-object,
 *  the returned partially applied function itself may still be called with (or bound to) a custom `this`.
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

    const partialfuncname = `partial ${func.name}`;
    
    return {
        [partialfuncname] : function (...args) {
            return func.call(this, ...boundargs, ...args);
        }
    }[partialfuncname]
}
