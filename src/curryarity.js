/**
 * @module curryarity
 */

'use strict';

const ARITY_ZERO = 0;
const CURRY_ARITY = Symbol.for('functionish/curryfunction/CURRY_ARITY');

/**
 * Return the current arity of the curried function *func* or `0` if *func* is not curried.
 * 
 * @example <caption>Example usage of `curryarity()`</caption>
 * 
 * const { curryarity, curry } = require('functionish/curry');
 *
 * const sum = curry( (a,b) => (a+b) );
 * const increment = sum(1);
 * 
 * curryarity(sum);         // returns 2
 * curryarity(increment);   // returns 1
 * curryarity(console.log); // returns 0
 * 
 * @function curryarity
 * @param {function} func The function to check
 * @returns {number}
 */
function curryarity(func) {
    return (func?.[CURRY_ARITY] ?? ARITY_ZERO);
}

module.exports = curryarity;