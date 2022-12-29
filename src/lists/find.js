/**
 * @module lists/find
 */

'use strict';

const isfunction = require('../isfunction');
const resolvefunction = require('../resolvefunction');

/**
 * Return the first value in *list* for which the *predicate* function returns a truthy value, or
 * `undefined` if no such value is found.
 * 
 * @example
 *     
 * const find = require('functionish/lists/find');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * find(iseven, [1,2,3,4]); // returns 2
 * find(iseven, [1,3,5]); // returns `undefined`
 * 
 * @func find
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {iterable} list An iterable object
 * @returns {any}
 */
module.exports = function find(predicate, list) {

    isfunction(predicate) || (predicate = resolvefunction(predicate));

    for(const value of list) if( predicate(value) ) return value;
}