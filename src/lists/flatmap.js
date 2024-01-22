/**
 * @module lists/flatmap
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/flatmap(): The source has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

/**
 * If *source* has a {@link external:Array.prototype.flatMap Array.prototype.flatMap()} method, pass *mapfunc* to it and
 * return the result. Otherwise, return a lazy iterable object that passes each value in *source* to the *mapfunc*
 * function and flattens the result by one level. Effectively the combination of a call to 
 * {@link module:lists/flat flat()} followed by a call to {@link module:lists/map map()}.
 * 
 * `flatmap()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `flatmap()`</caption>
 * 
 * const { flatmap } = require('functionish/lists');
 * 
 * const numbers = [4,5,6,9,12];
 * const getdivisors = value => (value === 4) ? [2]
 *                            : (value === 5) ? []
 *                            : (value === 6) ? [2,3]
 *                            : (value === 9) ? [3]
 *                            : (value === 12) ? [2,3,4,6];
 * 
 * const divisors = flatmap(getdivisors, numbers);
 * 
 * Array.from(divisors); // returns [2,2,3,3,2,3,4,6];
 * 
 * @function flatmap
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} mapfunc The mapping function
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable}
 */
function flatmap(mapfunc, source) {

    return issingleton(arguments) ? flatmap.bind(null, mapfunc)
         : isfunction(source?.flatMap) ? source.flatMap(mapfunc)
         : isiterable(source) ? flatmaplist(mapfunc, source)
         : raisebadlisterror(source);
}

function flatmaplist(mapfunc, source) {

    return list(

        function* () {

            for(const item of source) {

                const mapresult = mapfunc(item);

                isiterable(mapresult) ? yield* mapresult : yield mapresult;
            }
        }
    )
}

module.exports = flatmap;