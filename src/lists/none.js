/**
 * @module lists/none
 */

'use strict';

const curry1 = require('../curry1');
const isvoid = require('../types/isvoid');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns a falsy
 * value for each item. This function is the counterpart to {@link module:any any()}.
 * 
 * [to do: predicate is function or void]
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
const none = curry1(function none(predicate, list) {

    if( isvoid(predicate) ) {
        for(const value of list) if(value) return false;
    } else {
        for(const value of list) if( predicate(value) ) return false;
    }

    return true;

});

module.exports = none;