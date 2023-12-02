/**
 * @module math/atmost
 */

'use strict';

const curry1 = require('../curry1');

/**
 * Return *number* if its value is less than or equal to *upperbound*. Otherwise, return *upperbound*.
 * 
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `atmost()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `atmost()`</caption>
 * 
 * const { atmost } = require('functionish');
 * 
 * const atmost42 = atmost(42); // curried
 * 
 * atmost42(36); // returns 36
 * atmost42(43); // returns 42
 * 
 * @function atmost
 * @param {number} upperbound The upper limit (inclusive)
 * @param {number} number The number to check
 * @returns {number}
 */
const atmost = curry1(function atmost(upperbound, number) {
    return (upperbound >= number) ? number : upperbound;
})

module.exports = atmost;