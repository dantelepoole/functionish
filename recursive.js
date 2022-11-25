/**
 * @module recursive
 */

'use strict';

const resolvefunction = require('./resolvefunction');

/**
 * Return a function that allows *func* to emulate tail recursion.
 * 
 * To emulate tail recursion, instead of calling itself recursively, the target function
 * should call `this()` instead with the same arguments and return the result. The result
 * will be a recursive call to the target function without risk of exhausting the stack.
 * 
 * To work correctly, the call to `this()` *must* be a tail call, i.e. `this()`'s return
 * value must be the only thing returned, without any additional or intermediate operations.
 * 
 * The recursion ends when the target function returns anything other than the result of
 * calling `this()`.
 * 
 * Because `recurse()` relies on `this`, *func* may not be an arrow function, nor may it
 * be bound to specific `this`-value.
 * 
 * @example
 * const recursive = require('functionish/recursive');
 * 
 * const factorial = recursive(
 * 
 *     function (f, x) {
 *      
 *         return (x === undefined) ? this(1, f)
 *              : (x === 0) ? 1
 *              : (x === 1) ? f
 *              : this(f*x, x-1);
 *     }
 * )
 * 
 * factorial(8); // returns 40320
 * 
 * @func recursive
 * @param {function} func The function (or path to a function) to make recursive
 * @returns {function}
 */
module.exports = function recursive(func) {

    func = resolvefunction(func);
    
    return function recursivefunction(...args) {

        const recurse = (...nextargs) => (args = nextargs);
        const targetfunc = func.bind(recurse);

        let result = targetfunc(...args);

        while(result === args) result = targetfunc(...args);

        return result;
    }
}