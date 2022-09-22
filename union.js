/**
 * @module union
 */

'use strict';

const ERR_BAD_LIST = `UnionError~The %s list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable producing the items from *list1* followed by the items in *list2*, with duplicate items removed.
 * 
 * The returned iterable maintains a cache of all values passed through the iterator, allowing it to remove any
 * duplicate values it encounters. So you should never keep a union iterable around indefinitely, that would cause a
 * memory leak. Instead, call `union()` to create a new iterable each time you need one and let the garbage collector
 * collect it as soon as you are finished with it.
 * 
 * @func union
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        notiterable(list1) && fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        notiterable(list2) && fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        const listconcatenator = concat(list1, list2);

        return {
            [Symbol.iterator] : function* () {
                yield* uniq(listconcatenator);
            }
        }
    }
)

function concat(list1, list2) {

    return {
        [Symbol.iterator] : function* () {
            yield* list1;
            yield* list2;
        }
    }
}

function* uniq(list) {

    const isuniq = isuniqfactory();

    for(const item of list) if( isuniq(item) ) yield item;
}

function isuniqfactory() {

    const uniqitems = new Set();

    return item => (uniqitems.size !== uniqitems.add(item).size);
}