/**
 * @module lists/take
 */

'use strict';

const isarray = require('../types/isarray');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `take()`</caption>
 * 
 * [to do]
 * 
 * @function take
 * @param {number} count The number of items to take from *list*
 * @param {iterable} list The list of items to take the items from
 * @returns {any[]}
 */
function take(count, list) {
    
    if( ! (count > 0) ) count = 0;

    return isarray(list)
         ? list.slice(0, count)
         : takeiterable(count, list);
}

function takeiterable(count, list) {

    return {
        *[Symbol.iterator] () {

            for(const item of list) {

                if(count < 1) break;

                count -= 1;

                yield item;
            }
        }
    }
}

module.exports = take;