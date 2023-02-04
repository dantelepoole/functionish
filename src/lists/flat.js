/**
 * @module lists/flat
 */

'use strict';

const isiterable = require('../isiterable');

/**
 * Return an iterable object that flattens the values in *list* by one level, meaning that if any
 * value in list is iterable, that value itself is expanded.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `flat()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `flat()` (e.g. by loading it into an array).
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

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) isiterable(value) ? yield* value : yield value;
        }
    }
}

module.exports = flat;