/**
 * @module lists/map
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return an iterable object that passes each value to the *mapfunc* function and produces the results.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `map()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `map()` (e.g. by loading it into an array).
 * 
 * `map()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `map()`</caption>
 * 
 * const { map } = require('functionish/lists');
 * 
 * const double = x => (x*2);
 * 
 * const results = map(double, [1,2,3]);
 * Array.from(results); // returns [2,4,6]
 *     
 * @function map
 * @param {function} mapfunc The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
function map(mapfunc, list) {
    
    return {
        [Symbol.iterator] : function* () {
            for(const value of list) yield mapfunc(value);
        }
    }
}

module.exports = curry2(map);