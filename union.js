/**
 * @module union
 */

'use strict';

/**
 * Return an iterable producing the items from *list1* and *list2* but without duplicates. The function iterates through
 * *list1* followed by *list2*, skipping any duplicate items in either list.
 * 
 * `union()` is curried by default.
 * 
 * @func union
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        return {
            [Symbol.iterator] : function* () {
    
                const duplicateitems = new Set();
    
                for( const item of iterateuniq(duplicateitems, list1)) yield item;
                for( const item of iterateuniq(duplicateitems, list2)) yield item;
    
            }
        }
    }
)

function* iterateuniq(duplicateitems, iterable) {

    const iterator = iterable[Symbol.iterator]();

    let nextitem = nextuniqitem(duplicateitems, iterator);

    while( ! nextitem.done ) {
        yield nextitem.value;
        nextitem = nextuniqitem(duplicateitems, iterator);
    }
}

function nextuniqitem(duplicateitems, iterator) {

    let nextitem = iterator.next();

    while( ( ! nextitem.done ) && duplicateitems.has(nextitem.value) ) nextitem = iterator.next();

    if(! nextitem.done) duplicateitems.add(nextitem.value);

    return nextitem;
}