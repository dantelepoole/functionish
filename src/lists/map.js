/**
 * @module lists/map
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry = require('../curry');

const isfunction = x => (typeof x === TYPE_FUNCTION);

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
 * `map()` is curried by default with unary arity.
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
         ? list.map( x => mapfunc(x) )
         : maplist(mapfunc, list);
}

function maplist(mapfunc, list) {

    return {
        [Symbol.iterator] : function* () {
            for(const item of list) yield mapfunc(item);
        }
    }
}

module.exports = curry(1, map);