/**
 * @module defer
 */

'use strict';

/**
 * Return a function that call *func* with the specified *args*. This function behaves very similar to
 * {@link module:partial partial()} except that the deferred function will silently ignore any arguments passed to it.
 * 
 * @example <caption>Example usage of `defer()`</caption>
 * 
 * const { defer } = require('functionish');
 * 
 * const add = (a,b) => (a+b);
 * const sum = (...numbers) => numbers.reduce(add, 0);
 * 
 * const addition = defer(sum, 1, 2);
 * 
 * addition();      // returns 3
 * addition(4,5,6); // returns 3
 * 
 * @function defer
 * @param {function} func The function to call
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function}
 */
function defer(func, ...args) {
    return () => func(...args);
}

module.exports = defer;