/**
 * @module math/minimum
 */

'use strict';

/**
 * Return the lowest value in the argument *numbers* list or `Infinity` if the *numbers* list is empty.
 * 
 * @func minimum
 * @param {iterable} numbers An iterable object producing the numbers to check.
 * @returns {number}
 */
module.exports = function minimum(numbers) {
    return Math.min(...numbers);
}