/**
 * @module lists/map
 */

'use strict';

const curry2 = require('../curry2');
const isfunction = require('../types/isfunction');
const unary = require('../unary');

/**
 * Return an iterable object that passes each value to the *mapfunc* function and produces the results.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.map Array.prototype.map()}
 * method and returns the result. However, the *mapfunc* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.map Array.prototype.map()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be iterable and an iterable object is returned
 * that operates lazily.
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
    
    return isfunction(list.map)
         ? list.map( unary(mapfunc) )
         : mapiterable(mapfunc, list);
}

function mapiterable(mapfunc, list) {

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) yield mapfunc(value);
        }
    }
}

module.exports = curry2(map);