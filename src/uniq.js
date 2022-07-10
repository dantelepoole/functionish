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
 * @func uniq
 * @param {iterable} list An iterable object producing the items to remove duplicates from
 * @returns {iterable}
 */
module.exports = function uniq(list) {

    if( notiterable(list) ) fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            const uniqitems = new Set();

            for(const item of list) if(uniqitems.size !== uniqitems.add(item).size) yield item;
        }
    }
}