/**
 * @module recursive
 */

'use strict';

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
 * Because `recurse()` relies on `this`, *func* may not be an arrow function, nor may it already
 * be bound to specific `this`-value.
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * recursive function will be curried with the same arity.
 * 
 * @example <caption>Example usage of `recursive()`</caption>
 * 
 * const { recursive } = require('functionish');
 * 
 * const factorial = recursive(
 * 
 *     (f, x) => (x === 0) ? 1
 *             : (x === 1) ? f
 *             : (x === undefined) ? this(1, f)
 *             : this(f*x, x-1);
 * )
 * 
 * factorial(8); // returns 40320
 * 
 * @function recursive
 * @param {function} func The recursive function
 * @returns {function}
 */
function recursive(func) {

    return function _recursive(...args) {

        const recurse = (...nextargs) => (args = nextargs);

        let result = func.call(recurse, ...args);

        while(result === args) result = func.call(recurse, ...args);

        return result;
    }
}

module.exports = recursive;