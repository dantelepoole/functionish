/**
 * @module curry
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

/**
 * Return a curried variant of the *func* function that curries at least *arity* arguments before applying *func* and
 * returning the result. If only a function is provided, *arity* is taken from the that function's `length` property.
 * 
 * *As a rule of thumb, always prefer providing an explicit arity over relying on a function's length.* A function's
 * length does not count spread parameters, parameters with default values nor any paramaters that follow the first
 * parameter with a default value. To curry such functions, you must pass an arity, otherwise the arity will be set to
 * `0` (or whatever number of fixed parameters precede the spread/default paramaters). This can lead to unexpected and
 * difficult to debug behaviour, especially when composing curried functions with other functions.
 * 
 * Providing an explicit arity can help avoid these difficulties. For this reason, functionish provides the convenience
 * functions `curry1()`, `curry2()` and `curry3()` which ensure that the appropriate arity is set. In general, you
 * should use these convenience functions instead of `curry()` itself.
 * 
 * Many of functionish's functions with a fixed arity are curried by default, including `map()`, `filter()`,
 * `iterate()`, `reduce()` and others. See the documentation for a specific function to see whether or not it is
 * curried by default.
 * 
 * If the FUNCTIONISH_NAMED_FUNCTIONS environment variable has been set, a curried function's name will reflect its
 * curried state by having "curried" prepended to its name along with the arity. This can aid in debugging.
 *
 * @example
 * 
 * const curry = require('functionish/curry');
 *
 * const sum = curry( 2,
 *  
 *    function sum(a,b) { 
 *       return (a+b)
 *    } 
 * )
 * 
 * const increment = sum(1);
 * 
 * increment(42); // returns '43'
 *  
 * @func curry
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry3 curry3()}
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry
 * @returns {function}

 */
module.exports = NAMED_FUNCTIONS ? curry_named : curry;

function curry(arity, func) {

    if( arguments.length === 1 && typeof arity === 'function' ) [arity, func] = [arity.length, arity]

    function curried(...args) {
        return (args.length < arity) ? curried.bind(null, ...args) : func(...args);
    }

    return curried;
}

function curry_named(arity, func) {
   
    if( arguments.length === 1 && typeof arity === 'function' ) [arity, func] = [arity.length, arity]
    
    const curriedname = `curried(${arity}) ${func.name}`;

    const container = {
        [curriedname] : function(...args) {
            return (args.length < arity) ? curried.bind(null, ...args) : func(...args);
        }
    }

    const curried = container[curriedname];

    return curried;
}