/**
 * @module iterable
 */

'use strict';

const isiterable = require('./isiterable');

/**
 * Return an iterable object whose iterator produces the items in *list*. If *list* itself is not iterable, the
 * iterator produces only *list*, unless *list* is `undefined`, in which case the returned iterable will not produce
 * any items.
 * 
 * @param {(iterable|any)} list An iterable object or other value
 * @returns {iterable}
 */
module.exports = function iterable(list) {

    return {
        [Symbol.iterator] : isiterable(list) ? list[Symbol.iterator].bind(list) 
                          : (list !== undefined) ? function*() { yield list }
                          : function* () { return { done:true } }
    }
}