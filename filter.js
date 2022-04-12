/**
 * @module filter
 */

 'use strict';
 
 const unary = require('./unary');

/**
 * Function variant of `Array.prototype.filter()`. Apply the *predicate* function to *filterable*'s `filter()`-method
 * and return the result.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *filterable*'s `filter()`
 * method (if it exists). This means that *predicate* will only ever receive a single argument (the item being
 * filtered), regardless of how many arguments *filterable*'s `filter()` method actually passes.
 * 
 * `filter()` is curried by default.
 * 
 * @example
 * 
 * const filter = require('functionish/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * filter(iseven, [1,2,3,4,5]); // returns [2,4]
 * 
 * const object = {
 *    'a' : 42,
 *    'b' : 43,
 *    'c' : 44
 * }
 * 
 * filter(iseven, object); // returns { 'a':42, 'c':44 }
 * 
 * @func filter
 * @see {@link external:Array.prototype.filter Array.prototype.filter()}
 * @param {function} predicate The predicate function
 * @param {object} filterable An object that has a `filter()`-method
 * @returns {object} The result of *filterable*.filter()
 */

module.exports = require('./curry2')(

    function filter(predicate, filterable) {
        return filterable.filter( unary(predicate) );
    }
)

