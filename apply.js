/**
 * @module apply
 */

'use strict';

/**
 * Functional variant of {@link external:Function.prototype.apply Function.prototype.apply()}.
 * Pass *args* to *func* and return the result.
 * 
 * @example
 * 
 * const apply = require('functionish/apply');
 * 
 * function iseven(x) { return (x%2) === 0 }
 * 
 * apply(iseven, 42); // returns `42`
 * 
 * @func apply
 * @see {@link module:applicable applicable()}
 * @param {function} func The function to apply to *args*
 * @param {...any} args The arguments to pass to func
 * @returns {any}
 */

module.exports = function apply(func, ...args) {
    return func(...args);
}