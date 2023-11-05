/**
 * @module lists/flat
 */

'use strict';

const isfunction = require('../types/isfunction');
const list = require('./list');
const isiterablenotstring = require('../types/isiterablenotstring');

/**
 * Return an iterable object that flattens the values in *list* by one level, meaning that if any
 * value in list is iterable, that value itself is expanded.
 * 
 * If *list* has a `flat()` method, this function calls it and returns the result. Otherwise, *list* is presumed to be
 * iterable and an iterable object is returned that operates lazily.
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
 * @param {iterable} targetlist An iterable object
 * @returns {iterable}
 */
function flat(targetlist) {

    return isfunction(targetlist.flat)
         ? targetlist.flat()
         : flatlist(targetlist);
}

function flatlist(targetlist) {

    return list(
        function* () {
            for(const value of targetlist) isiterablenotstring(value) ? yield* value : yield value;
        }
    )
}

module.exports = flat;