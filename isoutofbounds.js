/**
 * @module isoutofbounds
 */

const ERR_BAD_INDEXABLE = `IsOutOfBoundsError~The indexable argument %s. Expected a number.`;

const fail = require('./fail');
const isnan = require('./isnan');
const isnumber = require('./isnumber');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

/**
 * Return `true` if *index* is less than 0 OR is greater than or equal to *indexable*'s length.
 * Otherwise, return `false`.
 * 
 * The *indexable* may be any object with a numeric `length`-property, e.g. a string or an array. Alternatively
 * *indexable* may be a number, in which case it represents the length to compare *index* against.
 * 
 * If *indexable* is not a number and has no numeric `length` property, or if *index* is not a number, this function
 * returns `true`.
 * 
 * `isoutofbounds()` is curried by default with binary arity.
 * 
 * @param {(indexable|number)} indexable The indexable object or length to check against
 * @param {number} index The index to check
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function isoutofbounds(indexable, index) {

        const upperbound = isnumber(indexable?.length) ? indexable.length
                         : isnumber(indexable) ? indexable
                         : failbadindexable(indexable);

        return (index < 0) || (index >= upperbound) || notnumber(index);
    }
)

function failbadindexable(indexable) {

    const message = isnan(indexable) ? `is NaN`
                  : isnumber(indexable) ? `is ${indexable}`
                  : `has type ${typeorclass(indexable)}`;

    fail(ERR_BAD_INDEXABLE, message);
}