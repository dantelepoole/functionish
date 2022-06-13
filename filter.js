/**
 * @module filter
 */

 'use strict';

const unary = require('./unary');

/**
 * Function variant of `Array.prototype.filter()`. Apply the *predicate* function to *filterable*'s `filter()`-method
 * and return the result. If *filterable* has no `filter()`-method, it is assumed to be iterable and an iterable object
 * is returned that produces only the items in *list* for which the *predicate* function returns a truthy value.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *filterable*'s `filter()`
 * method (if it exists). This means that *predicate* will only ever receive a single argument (the item being
 * filtered), regardless of how many arguments *filterable*'s `filter()` method actually passes.
 * 
 * `filter()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const filter = require('functionish/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * filter(iseven, [1,2,3,4,5]); // returns [2,4]
 * 
 * @func filter
 * @see {@link external:Array.prototype.filter Array.prototype.filter()}
 * @param {function} predicate The predicate function
 * @param {(filterable|iterable)} filterable An object that has a `filter()`-method or an iterable object
 * @returns {any} The return value of *list*'s `filter()` method or an iterable object if it doesn't have one
 */

module.exports = require('./curry2')(

    function filter(predicate, list) {
        return (typeof list.filter === 'function') ? list.filter( unary(predicate) ) : filteriterable(predicate, list);
    }
)

function filteriterable(predicate, iterable) {
    
    return {

        [Symbol.iterator] : function* () {
            for(const item of iterable) if( predicate(item) ) yield item;
        }
    }
}