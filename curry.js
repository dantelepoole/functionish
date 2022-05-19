/**
 * @module curry
 */

'use strict';

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
 * functions `curry2()` and `curry3()` which ensure that the appropriate arity is set. In general, you
 * should use these convenience functions instead of `curry()` itself, unless you need to set an even higher arity.
 * 
 * Many of functionish's functions with a fixed arity are curried by default, including `map()`, `filter()`,
 * `iterate()`, `reduce()` and others. See the documentation for a specific function to see whether or not it is
 * curried by default.
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
module.exports = curry;

function curry(arity, func) {

    if( arguments.length === 1 && typeof arity === 'function' ) [arity, func] = [arity.length, arity]

    function curried(...args) {
        return (args.length < arity) ? curried.bind(null, ...args) : func(...args);
    }

    return curried;
}