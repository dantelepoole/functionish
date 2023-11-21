/**
 * @module apply
 */

'use strict';

/**
 * Functional variant of {@link external:Function.prototype.apply Function.prototype.apply()}.
 * Pass *args* to *targetfunc* and return the result. `apply()` passes its own `this` value to
 * *targetfunc*.
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
 * @see {@link module:applicable applicable()}
 * @param {function} targetfunc The function to apply to *args*
 * @param {any[]} args An array with the arguments to pass to *targetfunc*
 * @returns {any}
 */
function apply(targetfunc, args) {

    return (arguments.length === 1)
         ? function _apply(argarray) { return targetfunc.apply(this, argarray) }
         : targetfunc.apply(this, args);
}

module.exports = apply;