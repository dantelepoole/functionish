/**
 * @module lists/flat
 */

'use strict';

const isiterable = require('../isiterable');

/**
 * Return an iterable object that flattens the values in *list* by one level, meaning that if any
 * value in list is iterable, that value itself is expanded.
 * 
 * @func flat
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
module.exports = function flat(list) {

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) isiterable(value) ? yield* value : yield value;
        }
    }
}