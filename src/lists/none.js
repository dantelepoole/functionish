/**
 * @module lists/none
 */

'use strict';

const curry = require('../curry');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns a falsy
 * value for each item. This function is the counterpart to {@link module:any any()}.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * `none()` is curried by default with unary arity.
 *
 * @example <caption>Example usage of `none()`</caption>
 * 
 * const { none } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * none(iseven, [1,3,7,42,9]); // returns false
 * none(iseven, [1,3,7,9]); // returns true
 *
 * @function none
 * @see {@link module:any any()}
 * @see {@link module:all all()}
 * @param {function} predicate The function to test the items in *list* with
 * @param {iterable} list An iterable object producing the items to test
 * @returns {boolean} 
 */
function none(predicate, list) {

    for(const value of list) if( predicate(value) ) return false;

    return true;

}

module.exports = curry(1, none);