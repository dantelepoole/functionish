/**
 * @module lists/findindex
 */

'use strict';

const INDEX_NOT_FOUND = -1;

const curry = require('../curry');

/**
 * Return the index of the first value in *list* for which the *predicate* function returns a truthy value, or
 * `-1` if no such value is found.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
 * 
 * `findindex()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `findindex()`</caption>
 *     
 * const { find } = require('functionish/lists');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * findindex(iseven, [1,2,3,4]); // returns 1
 * findindex(iseven, [1,3,5]); // returns -1
 * 
 * @function find
 * @param {function} predicate The predicate function identifying the item being searched
 * @param {iterable} list The list of items to search
 * @returns {any}
 */
function findindex(predicate, list) {

    let index = 0;

    for(const value of list) if( predicate(value) ) return index++;

    return INDEX_NOT_FOUND;
}

module.exports = curry(1, findindex);