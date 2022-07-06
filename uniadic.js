/**
 * @module uniadic
 */

'use strict';

const ERR_BAD_FUNCTION = `UniadicError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const isarray = require('./isarray');
const typeorclass = require('./typeorclass');

/**
 * Return a function that accepts a single argument and invokes the *func* function, passing the arguments
 * as a spread argument.
 * 
 * Use this function to convert a variadic function that accepts variable number of arguments to a uniadic function
 * whose parameter list consists of a single parameter.
 * 
 * The returned function accepts a single argument. If that argument is an array, it is passed to *func* as a spread
 * argument. If the argument is not array, it is passed as-is. If the returned function is called without arguments,
 * *func* is called without arguments as well.
 * 
 * @example
 * 
 * const uniadic = require('functionish/uniadic');
 * 
 * const max_uniadic = uniadic(Math.max);
 * 
 * max_uniadic( [1,2,3] ); // returns 3
 * 
 * @func uniadic
 * @see {@link module:variadic variadic()}
 * @param {function} func The function to apply
 * @returns {function}
 */
module.exports = function uniadic(func) {

    if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));
    
    return function uniadic_(arg) {
        
        return (arguments.length === 0) ? func.call(this)
             : isarray(arg) ? func.call(this, ...arg)
             : func.call(this, arg);
    }
}