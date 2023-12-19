/**
 * @module lists/flat
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/flat(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const list = require('./list');
const isiterablenotstring = require('../types/isiterablenotstring');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

/**
 * Return an iterable object that flattens the values in *sourcelist* by one level, meaning that if any
 * value in *sourcelist* is iterable, that value itself is expanded.
 * 
 * If *sourcelist* has a `flat()` method, this function calls it and returns the result. Otherwise, return a lazy iterable
 * object that flattens the values in *sourcelist* by one level (meaning that all items in *sourcelist* that are themselves
 * iterable, will be expanded).
 * 
 * @example <caption>Example usage of `flat()`</caption>
 * 
 * const { flat } = require('functionish/lists');
 * 
 * const batches = [ [1,2,3], [4,5,6], [7,8], 9, [[10]] ];
 * const flattened = flat(batches);
 * 
 * Array.from(flattened); // returns [1,2,3,4,5,6,7,8,9,[10]];
 * 
 * @function flat
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable}
 */
function flat(sourcelist) {

    return isfunction(sourcelist.flat) ? sourcelist.flat()
         : isiterablenotstring(sourcelist) ? flatlist(sourcelist)
         : raisebadlisterror(sourcelist);
}

function flatlist(targetlist) {

    return list(
        function* () {
            for(const value of targetlist) isiterablenotstring(value) ? yield* value : yield value;
        }
    )
}

module.exports = flat;