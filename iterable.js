/**
 * @module iterable
 */

'use strict';

const EMPTY_ITERABLE = function* () { return { done:true } }

const isiterable = require('./isiterable');
const isvoid = require('./isvoid');

/**
 * Return an iterable object whose iterator produces the items in *list*. If *list* itself is not iterable, the
 * iterator produces only *list*, unless *list* is `undefined`, `null` or `NaN`, in which case the returned iterable
 * will not produce any items.
 * 
 * @param {(iterable|any)} list An iterable object or other value
 * @returns {iterable}
 */
module.exports = function iterable(list) {

    return {
        [Symbol.iterator] : isiterable(list) ? list[Symbol.iterator].bind(list) 
                            : isvoid(list) ? EMPTY_ITERABLE
                            : function*() { yield list }
    }
}