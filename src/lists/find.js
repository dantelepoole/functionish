/**
 * @module lists/find
 */

'use strict';

const curry = require('../curry');
const isfunction = require('../types/isfunction');

/**
 * Return the first value in *list* for which the *predicate* function returns a truthy value, or
 * `undefined` if no such value is found.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
 * 
 * `find()` is curried by default with unary arity.
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

    if( isfunction(list.find) ) return list.find(predicate);

    for(const item of list) if( predicate(item) ) return item;
}

module.exports = curry(1, find);