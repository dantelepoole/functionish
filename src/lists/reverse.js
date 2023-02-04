/**
 * @module lists/reverse
 */

'use strict';

const EMPTY_STRING = '';
const TYPE_STRING = 'string';

/**
 * If *list* is a string, return it with its characters in reverse order.
 * 
 * Otherwise, return an iterable object that produces the items from *list* in reverse order,
 * without affecting or altering *list* itself.
 * 
 * The returned iterable object is semi-lazy. It needs to load *list* into memory entirely,
 * but does so only when you start iterating the returned iterable.If you change the contents
 * of *list* after calling `reverse()` and before processing the returned iterable, the changes
 * will be reflected in the returned iterable. If this not the desired behaviour, iterate over
 * the returned iterable immediately after calling `reverse()` (e.g. by loading it into an array).
 * 
 * @function reverse
 * @param {(iterable|string)} list An iterable object producing the items to reverse, or a string
 * @returns {(iterable|string)}
 */
function reverse(list) {

    return (typeof list === TYPE_STRING)
         ? list.split(EMPTY_STRING).reverse().join(EMPTY_STRING)
         : reverseiterable(list);
}

function reverseiterable(list) {

    return {

        [Symbol.iterator] : function* () {

            const items = Array.from(list);

            for(let i = items.length - 1; i >= 0; i -= 1) yield items[i];
        }
   }
}

module.exports = reverse;