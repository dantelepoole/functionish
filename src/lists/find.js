/**
 * @module lists/find
 */

'use strict';

const curry2 = require('../curry2');
const isarray = require('../types/isarray');
const unary = require('../unary');

/**
 * Return the first value in *list* for which the *predicate* function returns a truthy value, or
 * `undefined` if no such value is found.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.find Array.prototype.find()}
 * method and returns the result. However, the *predicate* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.find Array.prototype.find()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
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

    return isarray(list) 
         ? list.find( unary(predicate) )
         : finditerable(predicate, list);

    
}

function finditerable(predicate, list) {
    for(const value of list) if( predicate(value) ) return value;
}

module.exports = curry2(find);