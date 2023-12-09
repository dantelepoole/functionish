/**
 * @module logic/negate
 */

'use strict';

/**
 * Return a function that passes it arguments to *targetfunc* and returns the boolean complement
 * of *targetfunc*'s return value.
 * 
 * @example <caption>Example usage of `negate()`</caption>
 * 
 * const { negate } = require('functionish/logic');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = negate(iseven);
 * 
 * isodd(1); // returns true
 * isodd(2); // returns false
 * 
 * @function negate
 * @param {function} targetfunc The function to negate.
 * @returns {function}
 */
function negate(targetfunc) {
    return (...args) => !targetfunc(...args);
}

module.exports = negate;