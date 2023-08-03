/**
 * @module lists/filter
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry = require('../curry');

const isfunction = x => (typeof x === TYPE_FUNCTION);

/**
 * Return an iterable object that produces only the values in *list* for which the
 * *predicate* returns a truthy value.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.filter Array.prototype.filter()}
 * method and returns the result. However, the *predicate* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.filter Array.prototype.filter()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be iterable and an iterable object is returned
 * that operates lazily.
 * 
 * `filter()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `filter()`</caption>
 * 
 * const { filter } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * const evennumbers = filter(iseven, [1,2,3,4,5]);
 * 
 * Array.from(evennumbers); // returns [2,4]
 * 
 * @function filter
 * @see {@link module:lists/array array()}
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object
 * @returns {iterable} 
 */
function filter(predicate, list) {

    return isfunction(list.filter) 
         ? list.filter( x => predicate(x) )
         : filteriterable(predicate, list);
}

function filteriterable(predicate, list) {

    return {
        *[Symbol.iterator]() {
            for(const item of list) if( predicate(item) ) yield item;
        }
    }
}

module.exports = curry(1, filter);