/**
 * @module variadic
 */

'use strict';

const resolvefunction = require('./resolvefunction');

/**
 * Return a function that accepts a variable number of arguments and invokes the *func* function, passing the arguments
 * as a single array.
 * 
 * Use this function to convert uniadic function that accepts a single array parameter to a variadic function whose
 * parameter list consists of a single spread parameter.
 * 
 * @example
 * 
 * const variadic = require('functionish/variadic');
 * 
 * function sum(numbers) {
 *     return numbers.reduce( (a,b)=>(a+b), 0 );
 * }
 * 
 * const sum_variadic = variadic(sum);
 * 
 * sum_variadic(1,2,3); // returns 6
 * 
 * @func variadic
 * @see {@link module:uniadic uniadic()}
 * @param {function} func The function to apply
 * @returns {function}
 */
module.exports = function variadic(func, ...partialargs) {

    func = resolvefunction(func);

    return function variadicfunction(...args) {
        return func.call(this, [...partialargs, ...args]);
    }
}