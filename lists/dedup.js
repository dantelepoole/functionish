/**
 * @module lists/dedup
 */

'use strict';

const ERR_BAD_LIST = `DeDupError~The list has type %s. Expected an iterable object.`;

const fail = require('../fail');
const isiterable = require('../isiterable');
const typeorclass = require('../typeorclass');

/**
 * Return an iterable object that produces the items *list* but without duplicates.
 * 
 * @func dedup
 * @param {iterable} list An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
module.exports = function dedup(list) {

    isiterable(list) || fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            const isuniq = isuniqfactory();
            
            for(const value of list) if( isuniq(value) ) yield value;
        }
    }
}

function isuniqfactory() {

    const dedupvalues = new Set();

    return value => (dedupvalues.size < dedupvalues.add(value).size);
}