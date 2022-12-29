/**
 * @module repeat
 */

'use strict';

/**
 * Invoke *func* *count* number of times, passing *args* at each invocation. The *func* function wil be called
 * with `repeat()`'s `this`-object on each invocation.
 * 
 * @func repeat
 * @param {number} count The number of times to repeat *func*
 * @param {function} func The function to repeat
 * @param {...any} args The arguments to pass to *func* at each invocation
 */
module.exports = function repeat(count, func, ...args) {
    while(0 < count--) func(...args);
}