/**
 * @module uniq
 */

'use strict';

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

            const isuniq = isuniqfactory();

            for(const item of iterable) if( isuniq(item) ) yield item;
        }
    }
}

function isuniqfactory() {

    const cache = new Set();

    return function isuniq(item) {

        const priorcachesize = cache.size;

        cache.add(item);

        return (cache.size !== priorcachesize);
    }
}