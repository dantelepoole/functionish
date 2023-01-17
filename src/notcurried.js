/**
 * @module notcurried
 */

'use strict';

const CURRY_ARITY = Symbol.for('functionish/curryfunction/CURRY_ARITY');

/**
 * Return `true` if *func* has not been curried by passing it to {@link module:curry curry()}.
 * Otherwise, if *func* has been curried, return `false`.
 * 
 * @example <caption>Example usage of `notcurried()`</caption>
 * 
 * const { curry, notcurried } = require('functionish');
 * 
 * const add = (a,b) => (a+b);
 * notcurried(add); // returns true
 * 
 * const sum = curry(2, add);
 * notcurried(sum); // returns false
 * 
 * const increment = sum(1);
 * notcurried(increment); // returns false
 * 
 * @function notcurried
 * @see {@link module:iscurried iscurried()}
 * @see {@link module:curry curry()}
 * @param {function} func The function to check
 * @returns {boolean}
 */
function notcurried(func) {
    return ! func?.[CURRY_ARITY];
}

module.exports = notcurried;