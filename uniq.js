/**
 * @module uniq
 */

'use strict';

const ERR_BAD_LIST = `UniqError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable that produces the unique items in *list*, i.e. silently dropping any duplicate items it
 * encounters.
 * 
 * The returned iterable maintains a cache of all values passed through the iterator. So you should never keep
 * a uniq iterable around indefinitely, that would cause a memory leak. Instead, call `uniq()` to create a
 * new iterable each time you need one and let the garbage collector collect it as soon as you are finished with it.
 * 
 * @func uniq
 * @param {iterable} list An iterable object producing the items to remove duplicates from
 * @returns {iterable}
 */
module.exports = function uniq(list) {

    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory();

            for(const item of list) if( isuniq(item) ) yield item;
        }
    }
}

function isuniqfactory() {

    const uniqitems = new Set();

    return item => (uniqitems.size !== uniqitems.add(item).size);
}