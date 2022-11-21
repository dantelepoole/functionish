/**
 * @module reverse
 */

'use strict';

const EMPTY_STRING = '';
const ERR_BAD_LIST = `ReverseError~The list has type %s. Expected an iterable object or a string.`;

const fail = require('./fail');
const isstring = require('./isstring');
const isiterable = require('./isiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces the items from *list* in reverse order, without affecting or altering
 * *list* itself. Although *functionish* does not recognize strings as being iterable, `reverse()` does work with
 * strings.
 * 
 * @func reverse
 * @param {iterable} list An iterable object producing the items to reverse, or a string
 * @returns {iterable}
 */
module.exports = function reverse(list) {

    return isstring(list) ? list.split(EMPTY_STRING).reverse().join(EMPTY_STRING)
         : isiterable(list) ? reverseiterable(list)
         : fail(ERR_BAD_LIST, typeorclass(list));
}

function reverseiterable(iterable) {

    const items = Array.from(iterable);
    
    return {
        [Symbol.iterator] : function* () {
            for( let index = items.length - 1; index >= 0; index -= 1 ) yield items[index];
        }
   }
}