/**
 * @module curryarity
 */

'use strict';

const CURRY_ARITY = Symbol.for('functionish/curry/CURRY_ARITY');
const NULLARY_ARITY = 0;

/**
 * Return the current arity of the curried function *func*. If *func* is not curried, return `0`.
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
    return (func[CURRY_ARITY] ?? NULLARY_ARITY);
}

module.exports = curryarity;