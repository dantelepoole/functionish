/**
 * @module mapiterable
 */

'use strict';

const partial = require('./partial');

/**
 * Return an iterable that passes each item produced by *iterable* to *mapfunc*.
 * 
 * `mapiterable()` is curried by default.
 * 
 * @func mapiterable
 * @param {function} mapfunc The function to map the items from *list* with
 * @param {iterable} iterable The iterable that produces the items to map
 * @returns {iterable}
 */
module.exports = require('./curry2') (mapiterable);

function mapiterable(mapfunc, iterable) {

    return {

        [Symbol.iterator]() {

            const iterator = iterable[Symbol.iterator]();
            const next = partial(mapnextitem, mapfunc, iterator);

            return { next }
        }
    }
}

function mapnextitem(mapfunc, iterator) {
    
    const item = iterator.next();

    return item.done ? item : { done:false, value:mapfunc(item.value) }
}