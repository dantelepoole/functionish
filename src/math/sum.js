/**
 * @module math/sum
 */

'use strict';

const sumreducer = (a,b) => (a+b);

/**
 * Return the sum of *numbers*. If the *numbers* array is empty, `0` is returned.
 * 
 * This function does not check its argument types, so its behaviour will be
 * unpredicatble if passed any arguments with a type other than number.
 * 
 * @example <caption>Example usage of `sum()`</caption>
 * 
 * const { sum } = require('functionish/math');
 * 
 * sum(14, 20, 8); // returns 42
 * 
 * @function sum 
 * @param {...number[]} numbes The values to sum
 * @returns {number}
 */
function sum(...numbers) {
    return numbers.reduce(sumreducer, 0);
}

module.exports = sum;