/**
 * @module iswithinbounds
 */

/**
 * Return `true` if *index* is greater than or equal to 0 AND less than *indexable*'s length. Otherwise, return `false`.
 * 
 * The *indexable* may be any object with a numeric `length`-property, e.g. a string or an array. This function always
 * return `false` if *indexable* does not have a `length`-property.
 * 
 * `iswithinbounds()` is curried by default.
 * 
 * @param {indexable} indexable The indexable object to check against
 * @param {number} index The index to check
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function iswithinbounds(indexable, index) {
        return (index < indexable.length) && (index >= 0);
    }

)