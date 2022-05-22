/**
 * @module filteriterable
 */

'use strict';

const partial = require('./partial');

/**
 * Return an iterable that only produces the items from *iterable* for which the *predicate* function returns a
 * truthy value.
 * 
 * `filteriterable()` is curried by default.
 * 
 * @func filteriterable
 * @param {function} predicate The function to filter the items from *list* with
 * @param {iterable} iterable The iterable that produces the items to filter
 * @returns {iterable}
 */
module.exports = require('./curry2') (filteriterable)

function filteriterable(predicate, iterable) {
    
    return {

        [Symbol.iterator]() {

            const iterator = iterable[Symbol.iterator]();
            const next = partial(filternextitem, predicate, iterator);

            return { next }
        }
    }
}

function filternextitem(predicate, iterator) {
    
    let nextitem = iterator.next();

    while( ! (nextitem.done || predicate(nextitem.value)) ) nextitem = iterator.next();

    return nextitem;
}