/**
 * @module apply
 */

'use strict';

const curry2 = require('./curry2');

/**
 * Pass *args* to *func* and return the result.
 * 
 * Functional variant of {@link external:Function.prototype.apply Function.prototype.apply()} except it does not provide
 * for passing a custom `this`-obejct.
 * 
 * `apply()` is curried by default with binary arity.
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
 * @param {function} func The function to apply to *args*
 * @param {any[]} args An array with the arguments to pass to *func*
 * @returns {any}
 */
function apply(func, args) {

    const _apply = func.apply(this, args);
    
    return _apply;
}

module.exports = curry2(apply);