/**
 * @module iterable
 */

'use strict';

const EMPTY_ITERABLE = function* () { return { done:true } }

const isiterable = require('./isiterable');
const isundefined = require('./isundefined');

/**
 * Return an iterable object whose iterator produces the items in *list*. If *list* is not iterable, the returned
 * iterable return *list* itself as the only item, unless *list* is `undefined`, in which case the returned iterable
 * will be empty.
 * 
 * @param {(iterable|any)} list An iterable object or other value
 * @returns {iterable}
 */
module.exports = function iterable(list) {

    return {
        [Symbol.iterator] : isiterable(list) ? list[Symbol.iterator].bind(list) 
                          : isundefined(list) ? EMPTY_ITERABLE
                          : function*() { yield list }
    }
}