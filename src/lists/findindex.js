/**
 * @module lists/findindex
 */

'use strict';

const INDEX_NOT_FOUND = -1;

const curry = require('../curry');
const isfunction = require('../isfunction');

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

    if( isfunction(list.findIndex) ) return list.findIndex(predicate);

    let index = INDEX_NOT_FOUND;

    for(const value of list) {
        index += 1;
        if( predicate(value) ) break;
    }

    return index;
}

module.exports = curry(1, findindex);