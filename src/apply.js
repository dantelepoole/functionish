/**
 * @module apply
 */

'use strict';

/**
 * Functional variant of {@link external:Function.prototype.apply Function.prototype.apply()}.
 * Pass *args* to *targetfunc* and return the result.
 * 
 * Unlike most functionish functions, `apply()` forwards its own `this` value to *targetfunc*.
 * 
 * `apply()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `apply()`</caption>
 * 
 * const { apply } = require('functionish');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = x => (x%2) !== 0;
 * 
 * apply(iseven, [42]); // true
 * apply(isodd, [41]);  // false
 * 
 * @function apply
 * @param {function} targetfunc The function to apply to *args*
 * @param {any[]} argarray An array with the arguments to pass to *targetfunc*
 * @returns {any} *targetfunc*'s return value
 */
function apply(targetfunc, argarray) {

    return (arguments.length === 1)
         ? function _apply(argarray) { return targetfunc.apply(this, argarray) }
         : targetfunc.apply(this, argarray);
}

module.exports = apply;