/**
 * @module math/average
 */

'use strict';

const sumreducer = (a,b) => (a+b);

/**
 * Return the average value of the *numbers*.
 * 
 * This function does not check its argument types, so its behaviour will be
 * unpredicatble if passed any arguments with a type other than number.
 * 
 * @example <caption>Example usage of `average()`</caption>
 * 
 * const { average } = require('functionish/math');
 * 
 * average(0, 41, 43, 84); // returns 42
 * 
 * @function average
 * @param {...number[]} numbers The values to average
 * @returns {number}
 */
function average(...numbers) {
    
    const sum = numbers.reduce(sumreducer, 0);

    return (sum/numbers.length) || 0;
}

module.exports = average;