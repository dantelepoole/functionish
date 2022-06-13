/**
 * @module iterable
 */

'use strict';

const isiterable = require('./isiterable');

/**
 * Return an iterable object whose iterator produces the items in *list*. If *list* itself is not iterable, the
 * iterator produces only one item: *list*.
 * 
 * @param {(iterable|any)} list An iterable object or other value
 * @returns {iterable}
 */
module.exports = function iterable(list) {

    return {
        [Symbol.iterator] : isiterable(list) ? list[Symbol.iterator].bind(list) : function*() { yield list }
    }
}