/**
 * @module math/median
 */

'use strict';

const curry1 = require('../curry1');
const floor = require('../math/floor');
const isinteger = require('../types/isinteger');

const isodd = x => (x%2) === 1;
const numericsort = (a,b) => (a-b);

const mediansorted = values => [...values].sort(numericsort);

/**
 * Return the median value of *numbers*. If the *sort* argument is a truthy value, the *numbers* will first be sorted.
 * Otherwise, the *numbers* array is presumed to be in sorted order already.
 * 
 * This function does not check its argument types, so its behaviour will be
 * unpredicatble if passed any arguments with a type other than number.
 * 
 * `median()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `median()`</caption>
 * 
 * const { median } = require('functionish');
 * 
 * median(true, 84, 0, 43, 41); // sorts the arguments and returns 42
 * median(false, 0, 41, 42, 43, 84); // returns 42 without first sorting the input
 * 
 * @function median
 * @param {boolean} sort If truthy the *number* will first be sorted
 * @param {...number[]} numbers The values to calculate the median of
 * @returns {number}
 */
const median = curry1(function median(sort, ...numbers) {

    sort && (numbers = numbers.sort(numericsort));

    const midindex = (numbers.length / 2);

    return isinteger(midindex)
         ? (numbers[midindex-1] + numbers[midindex]) / 2
         : numbers[ floor(midindex) ]
});

module.exports = median;