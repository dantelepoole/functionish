/**
 * @module arrays/isoutofbounds
 */

const curry = require('../curry');

/**
 * Return `true` if *index* is less than 0 OR is greater than or equal to *array*'s `length` property.
 * Otherwise, return `false`.
 * 
 * `isoutofbounds()` is curried by default with unary arity.
 * 
 * @function isoutofbounds
 * @param {any[]} array The array to check *index* against
 * @param {number} index The index to check
 * @returns {boolean}
 */
function isoutofbounds(array, index) {
    return (index >= array.length) || (index < 0);
}

module.exports = curry(1, isoutofbounds);