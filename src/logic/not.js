/**
 * @module logic/not
 */

'use strict';

/**
 * Return a function that passes it arguments to *targetfunc* and returns the boolean complement
 * of *targetfunc*'s return value.
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
 * @param {function} targetfunc The function to negate.
 * @returns {function}
 */
function not(targetfunc) {
    return (...args) => !targetfunc(...args);
}

module.exports = not;