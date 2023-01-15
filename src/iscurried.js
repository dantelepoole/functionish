/**
 * @module iscurried
 */

'use strict';

const CURRY_ARITY = Symbol.for('functionish/curry/CURRY_ARITY');

/**
 * Return `true` if *func* has been curried by passing it to {@link module:curry curry()}.
 * Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `iscurried()`</caption>
 * 
 * const { curry, iscurried } = require('functionish');
 * 
 * const add = (a,b) => (a+b);
 * iscurried(add); // returns false
 * 
 * const sum = curry(2, add);
 * iscurried(sum); // returns true
 * 
 * const increment = sum(1);
 * iscurried(increment); // returns true
 * 
 * @function iscurried
 * @see {@link module:notcurried notcurried()}
 * @see {@link module:curry curry()}
 * @param {function} func The function to check
 * @returns {boolean}
 */
function iscurried(func) {
    return !! func?.[CURRY_ARITY];
}

module.exports = iscurried;