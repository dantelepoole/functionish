/**
 * @module lists/map
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/map(): The source argument has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

const ismappable = obj => isfunction(obj?.map);

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
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} mapfunc The function to apply to each item the *sourcelist*
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable}
 */
function map(mapfunc, sourcelist) {

    return issingleton(arguments) ? map.bind(null, mapfunc)
         : ismappable(sourcelist) ? sourcelist.map(mapfunc)
         : isiterable(sourcelist) ? maplist(mapfunc, sourcelist)
         : raisebadlisterror(sourcelist);
}


function maplist(mapfunc, sourcelist) {

    return list(
        function* mapiterator() {
            for(const item of sourcelist) yield mapfunc(item);
        }
    )
}

module.exports = map;