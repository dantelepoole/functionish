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
 * If *targetfunc* is not a function, the returned function will throw an error. If the returned function is called
 * without any arguments, *targetfunc* will be invoked with an empty array.
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
 * @param {function} targetfunc The function to make variadic
 * @returns {function}
 */
function variadic(targetfunc) {   
    return (...args) => targetfunc(args);
}

module.exports = variadic;