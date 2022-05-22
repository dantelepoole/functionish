/**
 * @module cachingiterable
 * @ignore
 */

'use strict';

module.exports = function cachingiterable(iterable) {

    const cache = [];
    let cachemode = false;

    const cachingiterable = {

        clearcache() {
            cache.length = 0;
            cachemode =false;
        },

        [Symbol.iterator]() {

            if( cachemode ) return cache[Symbol.iterator]();

            cachemode = true;

            const iterator = iterable[Symbol.iterator]();

            return {

                next() {
                    const item = iterator.next();

                    if( ! item.done ) cache.push(item.value);

                    return item;
                }
            }
        }
    }

    return cachingiterable;
}