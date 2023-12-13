/**
 * @module lists/map
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/map(): The source argument has type %s. Expected an iterable object.`;
const ERR_BAD_MAPFUNC = `functionish/lists/map(): The map function has type %s. Expected a function.`;

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterablenotstring = require('../types/isiterablenotstring');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);
const raisebadmapfuncerror = compose(raise, error.Type(ERR_BAD_MAPFUNC), typeorclassname);

/**
 * If the *sourcelist* has a method called `map()`, pass the *mapfunc* function to this method and return the
 * result. Otherwise, return a lazy iterable object that passes each item in the *sourcelist* to the *mapfunc*
 * and returns the results.
 * 
 * If the *sourcelist* has a `map()`-method (e.g. an Array) the *mapfunc* is passed to this method and result
 * is returned.
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
 * @param {function} mapfunc The function to apply to each item the *sourcelist*
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable}
 */
const map = curry1(function map(mapfunc, sourcelist) {
    
    isfunction(mapfunc) || raisebadmapfuncerror(mapfunc);
    
    return isfunction(sourcelist.map) ? sourcelist.map(mapfunc)
         : isiterablenotstring(sourcelist) ? maplist(mapfunc, sourcelist)
         : raisebadlisterror(sourcelist);
});

function maplist(mapfunc, sourcelist) {

    return list(
        function* mapiterator() {
            for(const item of sourcelist) yield mapfunc(item);
        }
    )
}

module.exports = map;