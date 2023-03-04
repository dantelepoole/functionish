/**
 * @module nullary
 */

'use strict';

/**
 * Coerce *func* to have nullary arity. More specifically, return a function that ignores its arguments and calls
 * *func* without any arguments.
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
 * @param {function} func The function to invoke without arguments
 * @returns {function}
 */

module.exports = function nullary(func) {

    const _nullary = () => func();

    return _nullary;
}