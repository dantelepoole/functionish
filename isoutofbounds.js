/**
 * @module isoutofbounds
 */

/**
 * Return `true` if *index* is less than 0 OR is greater than or equal to *indexable*'s length.
 * Otherwise, return `false`.
 * 
 * The *indexable* may be any object with a numeric `length`-property, e.g. a string or an array. This function always
 * return `true` if *indexable* does not have a `length`-property.
 * 
 * `isoutofbounds` is curried by default.
 * 
 * @param {indexable} indexable The indexable object to check against
 * @param {number} index The index to check
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function isoutofbounds(indexable, index) {
        return (index < 0) || (index >= (indexable.length ?? 0)) || (indexable.length === undefined);
    }

)