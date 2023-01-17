/**
 * @module witharity
 */

'use strict';

/**
 * Set the arity (number of parameters) for *func*. This function returns a new function that always passes *arity*
 * number of arguments to *func*, regardless of the number of arguments it actually receives. 
 * 
 * If *arity* is less than `5`, the returned function's `length` property will reflect its actual arity. Otherwise,
 * the returned function's `length` will be `0`, though it will still pass the specified number of arguments to the
 * target function.
 * 
 * The returned function will the same name as the target function, but tagged as having a specific arity.
 * 
 * `witharity()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `witharity()`</caption>
 * 
 * const { witharity } = require('functionish');
 * 
 * const returnargs = (...args) => args;
 * 
 * const ternary = witharity(3, returnargs);
 * 
 * ternary(); // returns [undefined, undefined, undefined]
 * ternary(1,2); // returns [1,2,undefined]
 * ternary(1,2,3,4,5); // returns [1,2,3]
 * 
 * @function witharity
 * @param {number} arity A positive integer specifying the desired arity
 * @param {function} func The target function
 * @returns {function}
 */
function witharity(arity, func) {
    return (...args) => ( (args.length = arity), func(...args) );
}

module.exports = witharity;