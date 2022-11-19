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
 * the target function was passed to {@link module:recursive recursive()} first, the result
 * will a recursive call to the target function without exhausting the stack.
 * 
 * The recursion ends when the target function returns any other value.
 * 
 * @example
 * const recursive = require('functionish/recursive');
 * const recurse = require('functionish/recurse');
 * 
 * const factorial = recursive(
 *     function factorial(total, number) {
 *         return (arguments.length === 1) ? recurse(1, total)
 *              : (number === 0) ? total
 *              : recurse(total*number, number-1);
 *     }
 * )
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