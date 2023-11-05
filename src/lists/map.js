/**
 * @module lists/map
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/map(): The source argument has type %s. Expected an iterable object.`;

const compose = require('../compose');
const curry = require('../curry');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

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
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable}
 */
function map(mapfunc, sourcelist) {
    
    isfunction(mapfunc) || (mapfunc = compose(...mapfunc));
    
    return isfunction(sourcelist.map) ? sourcelist.map(mapfunc)
         : isiterable(sourcelist) ? maplist(mapfunc, sourcelist)
         : raisebadlisterror(sourcelist);
}

function maplist(mapfunc, sourcelist) {

    return list(
        function* mappedlist() {
            for(const item of sourcelist) yield mapfunc(item);
        }
    )
}

module.exports = curry(1, map);