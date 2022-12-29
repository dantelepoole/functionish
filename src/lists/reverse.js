/**
 * @module lists/reverse
 */

'use strict';

const EMPTY_STRING = '';

const isstring = require('./isstring');

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
                          : reverseiterable(list);
}

function reverseiterable(iterable) {

    return {

        [Symbol.iterator] : function* () {

            const items = Array.from(iterable);

            let index = items.length;
            while(index > 0) yield items[--index];
        }
   }
}