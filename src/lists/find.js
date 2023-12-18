/**
 * @module lists/find
 */

'use strict';

const curry1 = require('../curry1');
const isfunction = require('../types/isfunction');

/**
 * If *list* has a `find()` method, it is passed the *predicate* and the result is returned. Otherwise, return the first
 * value in *list* for which the *predicate* function returns a truthy value, or `undefined` if no such value is found.
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
const find = curry1(function find(predicate, list) {

    if( isfunction(list.find) ) return list.find(predicate);

    for(const item of list) if( predicate(item) ) return item;
});

module.exports = find;