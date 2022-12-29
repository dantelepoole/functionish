/**
 * @module math/maximum
 */

'use strict';

/**
 * Return the highest value in the argument *numbers* list or `-Infinity` if the *numbers* list is empty.
 * 
 * @func maximum
 * @param {iterable} numbers An iterable object producing the numbers to check.
 * @returns {number}
 */
module.exports = function maximum(numbers) {
    return Math.max(...numbers);
}