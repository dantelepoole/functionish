/**
 * @module find
 */

'use strict';

const unary = require('./unary');

/**
 * Function variant of {@link external:Array.prototype.find Array.prototype.find()}. Pass *predicate* to *iterable*'s
 * `find()` function and return the result. If *iterable* has no `find()` method, iterate over *iterable*'s items and 
 * return the first item for which *predicate* returns a truthy value.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *iterable*'s `find()` method
 * (if it exists). This means that *predicate* will only ever receive a single argument (the item being searched),
 * regardless of how many arguments *iterable*'s `find()` method actually passes.
 * 
 * `find()` is curried by default.
 * 
 * @example
 *     
 * const find = require('functionish/find');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * find(iseven, [1,2,3,4]); // returns 2
 * find(iseven, [1,3,5]); // returns `undefined`
 * 
 * @func find
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {iterable} iterable An iterable object producing the items to search
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function find(predicate, iterable) {
        return (typeof iterable.find === 'function') ? iterable.find( unary(predicate) ) : finditerable(predicate, iterable);
    }
)

function finditerable(predicate, iterable) {
    for( const item of iterable ) if( predicate(item) ) return item;
}