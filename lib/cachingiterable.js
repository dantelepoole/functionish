/**
 * @module cachingiterable
 * @ignore
 */

'use strict';

module.exports = function cachingiterable(iterable) {

    const buffer = [];
    let buffermode = false;

    return {

        clearcache() {
            buffer.length = 0;
            buffermode =false;
        },

        get cache() { return buffer },

        [Symbol.iterator]() {

            if( buffermode ) return buffer[Symbol.iterator]();

            buffermode = true;

            const iterator = iterable[Symbol.iterator]();

            return {

                next() {
                    const item = iterator.next();

                    if( ! item.done ) buffer.push(item.value);

                    return item;
                }
            }
        }
    }
}