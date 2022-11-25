/**
 * @module uniq
 */

'use strict';

const ERR_BAD_LIST = `UniqError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable that produces the unique items in *list*, i.e. removing any duplicate items it
 * encounters.
 * 
 * @func uniq
 * @param {iterable} list An iterable object producing the items to remove duplicates from
 * @returns {iterable}
 */
module.exports = function uniq(list) {

    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            const duplicatevalues = new Set();
            
            for(const value of list) if( isuniq(duplicatevalues, value) ) yield value;

            duplicatevalues.clear();
        }
    }
}

function isuniq(valueset, targetvalue) {
    return (valueset.size !== valueset.add(targetvalue).size);
}