/**
 * @module apply
 */

'use strict';

const isarray = require('./isarray');

/**
 * Functional variant of {@link external:Function.prototype.apply Function.prototype.apply()}.
 * 
 * Pass *args* to *func* and return the result. The *args* should be an array containing the arguments to pass to
 * *func*. If *args* is not array, *arg*'s value will be passed to *func* as the only argument.
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

module.exports = require('./curry2')(apply)

function apply(func, args) {

    if( ! isarray(args) ) args = [args];

    return func.apply(null, args);
}