/**
 * @module math/constrain
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return *number* if it lies between *lowerbound* and *upperbound* (both inclusive). Otherwise, return
 * the applicable bounded value. 
 * 
 * This function does not verify the argument types, so its behaviour is unpredictable if passed anything other than
 * number types.
 * 
 * `constrain()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `constrain()`</caption>
 * 
 * const { constrain } = require('functionish');
 * 
 * constrain(0, 10, 5); // returns 5
 * constrain(0, 10, -1); // returns 0
 * constrain(0, 10, 42); // returns 10
 * 
 * constrain(1, 10, null); // returns NaN
 * constrain(1, 10, undefined); // returns NaN
 * constrain(1, 10, NaN); // returns NaN
 * 
 * const between1and10 = constrain(1, 10); // curried
 * between1and10(42); // returns 10
 * 
 * @function constrain
 * @param {number} lowerbound The lower limit (inclusive)
 * @param {number} upperbound The upper limit (inclusive)
 * @param {number} number The number to check
 * @returns {number}
 */
const constrain = curry2(function constrain(lowerbound, upperbound, number) {
    
    return (number < lowerbound) ? lowerbound
         : (number > upperbound) ? upperbound
         : number;
});

module.exports = constrain;