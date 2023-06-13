/**
 * @module partial
 */

'use strict';

const curry = require("./curry");

/**
 * Partial apply the *func*-function by binding to *partialargs*.  
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * partial function will be curried with an arity equal to *func*'s curried arity minus the number of
 * *partialargs* passed to `partial()`.
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
 * @param  {...any} partialargs Zero or more arguments to partially apply *func* with
 * @returns {function}
 */
function partial(func, ...partialargs) {

    return function _partial(...args) {
        return func.call(this, ...partialargs, ...args);
    }
}

module.exports = partial;
