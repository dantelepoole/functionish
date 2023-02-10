/**
 * @module logic/not
 */

'use strict';

const curryfunction = require('../../lib/curryfunction');

/**
 * Return a function that passes it arguments to *func* and returns the boolean complement
 * of *func*'s return value.
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * negated function will be curried with the same arity.
 * 
 * @example <caption>Example usage of `not()`</caption>
 * 
 * const { not } = require('functionish/logic');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = not(iseven);
 * 
 * isodd(1); // returns true
 * isodd(2); // returns false
 * 
 * @function not
 * @param {function} func The function to negate.
 * @returns {function}
 */
function not(func) {
    
    const _not = (...args) => ! func(...args);

    return func.arity
         ? curryfunction(func.arity, _not)
         : _not;
}

module.exports = not;