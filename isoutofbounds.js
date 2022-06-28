/**
 * @module isoutofbounds
 */

const UPPERBOUND_REJECT = -1;

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
 * `isoutofbounds` is curried by default with binary arity.
 * 
 * @param {(indexable|number)} indexable The indexable object or length to check against
 * @param {number} index The index to check
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function isoutofbounds(indexable, index) {

        const upperbound = (typeof indexable?.length === 'number') ? indexable.length
                         : (typeof indexable === 'number') ? indexable
                         : UPPERBOUND_REJECT;

        return ! (index >= 0 && index < upperbound);
    }

)