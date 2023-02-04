/**
 * @module lists/filter
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return an iterable object that produces only the values in *list* for which the
 * *predicate* returns a truthy value.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `filter()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `filter()` (e.g. by loading it into an array).
 * 
 * `filter()` is curried by default with binary arity.
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

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) predicate(value) && (yield value);
        }
    }
}

module.exports = curry2(filter);