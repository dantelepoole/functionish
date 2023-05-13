/**
 * @module variadic
 */

'use strict';

/**
 * Return a function that accepts a spread paramter list and invokes the *func* function, passing the arguments
 * as a single array.
 * 
 * Use this function to convert a uniadic function that accepts a single array argument to a variadic function with
 * a spread parameter list.
 * 
 * @example <caption>Example usage of `variadic()`</caption>
 * 
 * const { variadic } = require('functionish');
 * 
 * function sum(numberarray) {
 *     return numberarray.reduce( (a,b)=>(a+b), 0 );
 * }
 * 
 * const sum_variadic = variadic(sum);
 * 
 * sum_variadic(1,2,3); // returns 6
 * 
 * @function variadic
 * @see {@link module:uniadic uniadic()}
 * @param {function} func The function to make variadic
 * @param {...any[]} partialargs Optional arguments to pass to *func*
 * @returns {function}
 */
function variadic(func, ...partialargs) {
    
    return function _variadicfunction(...args) {
        return func.call(this, ...partialargs, args);
    }
}

module.exports = variadic;