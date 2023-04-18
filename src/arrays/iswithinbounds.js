/**
 * @module arrays/iswithinbounds
 */

const curry = require('../curry');

/**
 * Return `true` if *index* is greater than or equal to 0 AND less than *indexable*'s length. Otherwise, return `false`.
 * 
 * `iswithinbounds()` is curried by default with unary arity.
 * 
 * @function iswithinbounds
 * @param {any[]} array The array to check *index* against
 * @param {number} index The index to check
 * @returns {boolean}
 */
function iswithinbounds(array, index) {
    return (index < array.length) && (index >= 0);
}

module.exports = curry(1, iswithinbounds);
