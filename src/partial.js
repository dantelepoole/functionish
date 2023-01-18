/**
 * @module partial
 */

'use strict';

const CONTEXT_NONE = null;

const curryfunction = require('../lib/curryfunction');

/**
 * Partial apply the *func*-function by binding to *boundargs*.  
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * partial function will be curried with an arity equal to *func*'s curried arity minus the number of
 * *boundargs* passed to `partial()`.
 * 
 * @example <caption>Example usage of `partial()`</caption>
 * 
 * const partial = require('functionish/partial')
 * 
 * function sum(a,b) {
 *     return (a+b)
 * }
 * 
 * const increment = partial(sum, 1);
 * increment(42); // returns 43
 * 
 * @function partial
 * @param {function} func The function to partially apply
 * @param  {...any} boundargs Zero or more arguments to partially apply *func* with
 * @returns {function}
 */
function partial(func, ...boundargs) {

    const partialfunc = func.bind(CONTEXT_NONE, ...boundargs);

    if( ! func.arity ) return partialfunc;

    const partialarity = func.arity - boundargs.length;

    return (partialarity > 0)
         ? curryfunction(partialarity, partialfunc)
         : partialfunc;
}

module.exports = partial;
