/**
 * @module lists/tail
 */

'use strict';

const isslicable = list => (typeof list.slice === 'function');
/**
 * Return a copy of *list* without its first list.
 * 
 * If *list* has a `slice()` method, this function calls it and returns the result. Otherwise,
 * this function returns an iterable object producing all but the first item in *list*.
 * 
 * @function tail
 * @param {iterable} list The list of items to copy the tail of.
 * @returns {iterable}
 */
module.exports = function tail(list) {
 
    if( isslicable(list) ) return list.slice(1);

    return {

        [Symbol.iterator]: function* () {

            let skipitem = true;

            for(const value of list) skipitem ? (skipitem = false) : yield value;

        }
    }
}