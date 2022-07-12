/**
 * @module reverse
 */

'use strict';

const ERR_BAD_LIST = `ReverseError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces the items from *list* in reverse order, without affecting or altering
 * *list* itself.
 * 
 * @func reverse
 * @param {iterable} list An iterable object producing the items to reverse
 * @returns {iterable}
 */
module.exports = function reverse(list) {

    if( notiterable(list) ) fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            const items = Array.from(list);
            for( let index = items.length - 1; index >= 0; index -= 1) yield items[index];
        }
   }
}