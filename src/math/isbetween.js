/**
 * @module math/isbetween
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return `true` if *value* is a number between *lowerbound* and *upperbound* (both inclusive).
 * 
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `isbetween()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `isbetween()`</caption>
 * 
 * const { isbetween } = require('functionish');
 * 
 * isbetween(0, 10, 42); // returns false;
 * isbetween(0, 10, 5); // returns true;
 * isbetween(0, 10, 0); // returns true;
 * isbetween(0, 10, 10); // returns true;
 * 
 * @function isbetween
 * @param {number} number The value to check
 * @returns {boolean}
 */
const isbetween = curry2(function isbetween(lowerbound, upperbound, number) {
    return (lowerbound <= number) && (upperbound >= number);
});

module.exports = isbetween;