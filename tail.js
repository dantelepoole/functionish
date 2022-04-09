'use strict';

const isiterable = require('./lib/isiterable');

const isslicable = value => (typeof value?.slice === 'function');

/**
 * Return a copy of *list* without its first item. If *list* has a `slice()`-method, call it with an argument of `1`
 * and return the result. If *list* is iterable, return an array containing all its items except the first one.
 * Otherwise, return an empty array.
 * 
 * This function complements the `head()` function, which returns the first item of its argument list.
 * 
 * @module tail
 * @see {@link module:head head()}
 * @param {(array|string|iterable)} list The list of items to return the tail of
 * @returns {(array|string)}
 */
module.exports = function tail(list) {

    return isslicable(list) ? list.slice(1)
         : isiterable(list) ? iterabletail(list)
         : [];
}

function iterabletail(iterable) {

    const buffer = [];
    let istailitem = false;

    for( const item of iterable ) {

        if( istailitem ) {
            buffer.push(item);
            continue;
        }

        istailitem = true;
    }

    return buffer;
}
