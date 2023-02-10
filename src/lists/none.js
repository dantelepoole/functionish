/**
 * @module lists/none
 */

'use strict';

const curry2 = require('../curry2');
const isfunction = require('../types/isfunction');
const unary = require('../unary');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns a falsy
 * value for each item. This function is the counterpart to {@link module:any any()}.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * If *list* is an array, this function calls the {@link external:Array.prototype.some Array.prototype.some()}
 * method and returns the logical complement of result. However, the *predicate* function will only ever be called with
 * a single argument (the current list item), not the additional arguments that {@link external:Array.prototype.some Array.prototype.some()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
 * 
 * `none()` is curried by default with binary arity.
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

    return isfunction(list.some)
         ? ! list.some( unary(predicate) )
         : noneiterable(predicate, list);

}

function noneiterable(predicate, list) {

    for(const value of list) if( predicate(value) ) return true;

    return false;
}

module.exports = curry2(none);