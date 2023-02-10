/**
 * @module lists/flat
 */

'use strict';

const isiterable = require('../isiterable');
const isarray = require('../types/isarray');


/**
 * Return an iterable object that flattens the values in *list* by one level, meaning that if any
 * value in list is iterable, that value itself is expanded.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.flat Array.prototype.flat()}
 * method and returns the result. If *list* is not an array, it is presumed to be iterable and an iterable
 * object is returned that operates lazily.
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

    return isarray(list)
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