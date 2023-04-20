/**
 * @module lists/flat
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry = require('../curry');

const isfunction = x => (typeof x === TYPE_FUNCTION);

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
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
function flat(list) {

    return isfunction(list.flat)
         ? list.flat()
         : flatiterable();
}

function flatiterable(list) {

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) isiterable(value) ? yield* value : yield value;
        }
    }
}

module.exports = flat;