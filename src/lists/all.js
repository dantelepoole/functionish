/**
 * @module lists/all
 */

'use strict';

const curry = require('../curry');
const isfunction = require('../types/isfunction');
const unary = require('../unary');

/**
 * Functional variant of {@link external:Array.prototype.every() Array.prototype.every()}. Apply the *predicate*
 * function to each item in *list* and return `true` if and only if *predicate* returns `true` each time. Otherwise,
 * return `false`.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a falsy value, without
 * evaluating any remaining items in *list*.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.every Array.prototype.every()}
 * method and returns the result. However, the *predicate* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.every Array.prototype.every()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
 * 
 * `all()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `all()`</caption>
 * 
 * const { all } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * all(iseven, [2,4,6]); // returns `true`
 * all(iseven, [1,42,3]);  // returns `false`
 * 
 * @function all
 * @see {@link module:any any()}
 * @see {@link module:none none()}
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object producing the items to test
 * @returns {boolean}
 */
function all(predicate, list) {

    return isfunction(list.every)
         ? list.every( unary(predicate) )
         : alliterable(predicate, list);
}

function alliterable(predicate, list) {

    for(const value of list) if( ! predicate(value) ) return false;

    return true;
}

module.exports = curry(1, all);