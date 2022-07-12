/**
 * @module apply
 */

'use strict';

/**
 * Pass *args* to *func* and return the result.
 * 
 * Functional variant of {@link external:Function.prototype.apply Function.prototype.apply()} except it does not provide
 * for passing a custom `this`-obejct.
 * 
 * `apply()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const apply = require('functionish/apply');
 * 
 * function iseven(x) { return (x%2) === 0 }
 * 
 * apply(iseven, 42); // returns true
 * 
 * @func apply
 * @see {@link module:applicable applicable()}
 * @param {function} func The function to apply to *args*
 * @param {any[]} args An array with the arguments to pass to func
 * @returns {any} *func*'s return value
 */

module.exports = require('./curry2')(

    function apply(func, args) {
        return func.apply(null, args);
    }
)