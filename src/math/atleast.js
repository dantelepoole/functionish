/**
 * @module math/atleast
 */

'use strict';

const curry1 = require('../curry1');

/**
 * Return *number* if its value is greater than or equal to *lowerbound*. Otherwise, return *lowerbound*.
 * 
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `atleast()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `atleast()`</caption>
 * 
 * const { atleast } = require('functionish/math');
 * 
 * const atleast42 = atleast(42); // curried
 * 
 * atleast42(36); // returns 42
 * atleast42(43); // returns 43
 * 
 * @function atleast
 * @param {number} lowerbound The lower limit (inclusive)
 * @param {number} number The number to check
 * @returns {number}
 */
const atleast = curry1(function atleast(lowerbound, number) {
    return (lowerbound <= number) ? number : lowerbound;
})

module.exports = atleast;