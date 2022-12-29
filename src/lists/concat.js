/**
 * @module lists/concat
 */

'use strict';

const isiterable = require('../isiterable');

/**
 * Return an iterable object that flattens each *list* in *lists* in order. If a *list* is not iterable,
 * the returned iterable produces the *list* itself.
 * 
 * @example
 * 
 * const concat = require('functionish/lists/concat');
 * 
 * concat([1,2], 3, 4, [5,6]); // returns '[1,2,3,4,5,6]'
 * 
 * @func concat
 * @param  {...iterable[]} lists One or more iterable objects to flatten and concatenate
 * @returns {iterable}
 */

module.exports = function concat(...lists) {
    
    return {
        [Symbol.iterator] : function* () {
            for(const list of lists) isiterable(list) ? yield* list : yield list;
        }
    }
}