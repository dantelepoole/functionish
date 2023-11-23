/**
 * @module nullary
 */

'use strict';

/**
 * Return a function that always invokes *targetfunc* with no arguments, regardless of the actual
 * number of arguments it receives. Any arguments passed are silently discarded before invoking *targetfunc*.
 * 
 * @example <caption>Example usage of `nullary()`</caption>
 * 
 * const { nullary } = require('functionish');
 * 
 * const sum = (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 );
 * const always42 = nullary(sum, 42, 0);
 * 
 * always42(57, 38, 12, 99, 48); // returns 42
 *  
 * @func nullary
 * @see {@link module:witharity witharity()}
 * @see {@link module:unary unary()}
 * @see {@link module:binary binary()}
 * @param {function} targetfunc The function to invoke without arguments
 * @returns {function}
 */

function nullary(targetfunc) {
    return () => targetfunc();
}

module.exports = nullary;