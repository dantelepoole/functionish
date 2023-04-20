/**
 * @module lists/concat
 */

'use strict';

const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

const isarray = require('../types/isarray');

const isiterable = x => (typeof x?.[Symbol.iterator] === TYPE_FUNCTION) && (typeof x !== TYPE_STRING);

/**
 * Return an iterable object that flattens each *list* in *lists* in order. If a *list* is not iterable,
 * the returned iterable produces the *list* itself.
 * 
 * If the first list in the *lists* array is array, its {@link external:Array.prototype.concat Array.prototype.concat()}
 * method is called and the result is returned. Otherwise, the *lists* are presumed to be iterable objects
 * and a new iterable object is returned that operates lazily.
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
    
    return isarray(lists[0])
         ? lists[0].concat( ...lists.slice(1) )
         : concatiterable(lists);
}

function concatiterable(lists) {

    return {
        [Symbol.iterator] : function* () {
            for(const list of lists) isiterable(list) ? yield* list : yield list;
        }
    }
}

module.exports = concat;