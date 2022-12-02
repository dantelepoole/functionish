/**
 * @module lists/dedup
 */

'use strict';

const ERR_BAD_LIST = `DeDupError~The list has type %s. Expected an iterable object.`;

const fail = require('../fail');
const notiterable = require('../notiterable');
const typeorclass = require('../typeorclass');

/**
 * Remove any duplicates items in *list*.
 * 
 * @func dedup
 * @param {iterable} list An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
module.exports = function dedup(list) {

    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            const dedupset = new Set();
            const isuniq = value => (dedupset.size < dedupset.add(value).size);
            
            for(const value of list) if( isuniq(value) ) yield value;
        }
    }
}