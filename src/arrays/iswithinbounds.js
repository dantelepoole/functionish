/**
 * @module arrays/iswithinbounds
 */

const curry = require('../curry');

/**
 * Return `true` if *index* is greater than or equal to 0 AND less than *indexable*'s length. Otherwise, return `false`.
 * 
 * The *indexable* may be any object with a numeric `length`-property, e.g. a string or an array. Alternatively,
 * *indexable* may be a number, in which case it is used as the length to compare *index* against.
 * 
 * If *indexable* is not a number and has no numeric `length` property, or if *index* is not a number, this function
 * returns `false`.
 * 
 * `iswithinbounds()` is curried by default with unary arity.
 * 
 * @function iswithinbounds
 * @param {indexable} indexable The indexable object to check against
 * @param {number} index The index to check
 * @returns {boolean}
 */
function iswithinbounds(indexable, index) {
    return (index >= 0 && index < indexable.length);
}

module.exports = curry(1, iswithinbounds);
