/**
 * @module iswithinbounds
 */

 const ERR_BAD_INDEXABLE = `IsWithinBoundsError~The indexable argument %s. Expected a number.`;

 const fail = require('./fail');
 const isnan = require('./isnan');
 const isnumber = require('./isnumber');
 const typeorclass = require('./typeorclass');

/**
 * Return `true` if *index* is greater than or equal to 0 AND less than *indexable*'s length. Otherwise, return `false`.
 * 
 * The *indexable* may be any object with a numeric `length`-property, e.g. a string or an array. Alternatively,
 * *indexable* may be a number, in which case it is used as the length to compare *index* against.
 * 
 * If *indexable* is not a number and has no numeric `length` property, or if *index* is not a number, this function
 * returns `false`.
 * 
 * `iswithinbounds()` is curried by default with binary arity.
 * 
 * @param {indexable} indexable The indexable object to check against
 * @param {number} index The index to check
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function iswithinbounds(indexable, index) {

        const upperbound = isnumber(indexable?.length) ? indexable.length
                         : isnumber(indexable) ? indexable
                         : failbadindexable(indexable);

        return (index >= 0 && index < upperbound);
    }

)

function failbadindexable(indexable) {

    const message = isnan(indexable) ? `is NaN`
                  : isnumber(indexable) ? `is ${indexable}`
                  : `has type ${typeorclass(indexable)}`;

    fail(ERR_BAD_INDEXABLE, message);
}