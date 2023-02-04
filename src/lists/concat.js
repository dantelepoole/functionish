/**
 * @module lists/concat
 */

'use strict';

const isiterable = require('../types/isiterable');

/**
 * Return an iterable object that flattens each *list* in *lists* in order. If a *list* is not iterable,
 * the returned iterable produces the *list* itself.
 * 
 * @example <caption>Example usage of `concat()`</caption>
 * 
 * const { concat } = require('functionish/lists');
 * 
 * const list = concat([1,2], 3, 4, [5,6]); 
 * 
 * Array.from(lists); // returns '[1,2,3,4,5,6]'
 * 
 * @function concat
 * @param  {...iterable[]} lists One or more iterable objects to flatten and concatenate
 * @returns {iterable}
 */
function concat(...lists) {
    
    return {
        [Symbol.iterator] : function* () {
            for(const list of lists) isiterable(list) ? yield* list : yield list;
        }
    }
}

module.exports = concat;