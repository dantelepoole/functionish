/**
 * @module lists/find
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return the first value in *list* for which the *predicate* function returns a truthy value, or
 * `undefined` if no such value is found.
 * 
 * `find()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `find()`</caption>
 *     
 * const { find } = require('functionish/lists');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * find(iseven, [1,2,3,4]); // returns 2
 * find(iseven, [1,3,5]); // returns `undefined`
 * 
 * @function find
 * @param {function} predicate The predicate function identifying the item being searched
 * @param {iterable} list The list of items to search
 * @returns {any}
 */
function find(predicate, list) {
    for(const value of list) if( predicate(value) ) return value;
}

module.exports = curry2(find);