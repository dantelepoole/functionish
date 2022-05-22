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
 module.exports = function uniq(iterable) {

    return {
        [Symbol.iterator]() {

            const iterator = iterable[Symbol.iterator]();
            const duplicateitems = new Set();
            const next = partial(nextuniqitem, duplicateitems, iterator);

            return { next }
        }
    }
}

function nextuniqitem(duplicateitems, iterator) {

    let nextitem = iterator.next();

    while( ( ! nextitem.done ) && duplicateitems.has(nextitem.value) ) nextitem = iterator.next();

    nextitem.done ? duplicateitems.clear() : duplicateitems.add(nextitem.value);

    return nextitem;
}