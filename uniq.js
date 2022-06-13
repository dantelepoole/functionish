/**
 * @module uniq
 */

'use strict';

const partial = require('./partial');

/**
 * Return an iterable that produces the unique items in *iterable*, i.e. silently dropping any duplicate items it
 * encounters.
 * 
 * @func uniq
 * @param {iterable} iterable The iterable of items to remove duplicates from
 * @returns {iterable}
 */
module.exports = uniq;
 
function uniq(iterable) {

    return {
        [Symbol.iterator] : function* () {

            const duplicateitems = new Set();

            for(const item of iterable) {
                
                if( ! duplicateitems.has(item) ) {
                    duplicateitems.add(item);
                    yield item;
                }
            }
        }
    }
}
