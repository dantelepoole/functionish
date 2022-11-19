/**
 * @module recurse
 */

'use strict';

const RECURSE_SYMBOL = Symbol.for(`functionish/recurse#RECURSE_SYMBOL`);

/**
 * When used in conjunction with {@link module:recursive recursive()}, this function
 * allows a function to emulate tail recursion.
 * 
 * To emulate tail recursion, instead of calling itself recursively, the target function
 * should call `recurse()` instead with the same arguments and return the result. Assuming
 * the target function was first passed to {@link module:recursive recursive()}, the result
 * will be a recursive call to the target function without risk of exhausting the stack.
 * 
 * To work correctly, the call to `recurse()` *must* be a tail call, i.e. `recurse()`'s return
 * value must be the only thing returned, without any additional intermediate operations.
 * 
 * The recursion ends when the target function returns anything other than the `recurse()`'s
 * return value.
 * 
 * @example
 * const recursive = require('functionish/recursive');
 * const recurse = require('functionish/recurse');
 * 
 * const factorial_recursive = recursive(
 *     function factorial(f, x) {
 *         if(x < 0) throw new Error('negative x');
 *         return (x === 0) ? f : recurse(f*x, x-1);
 *     }
 * )
 * 
 * const factorial = x => factorial_recursive(1, x);
 * 
 * factorial(8); // returns 40320
 * 
 * @func recurse
 * @see {@link module:recursive recursive()}
 * @param  {...any} args The arguments to pass recursively
 */
module.exports = function recurse(...args) {

    return {
        args,
        recurse: RECURSE_SYMBOL
    }
}