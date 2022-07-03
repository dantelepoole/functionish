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
 * `union()` is curried by default with binary arity.
 * 
 * @func union
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        if( notiterable(list1) ) fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        else if( notiterable(list2) ) fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        return {
            [Symbol.iterator] : function* () {
                yield* uniq( concatlists(list1, list2) );
            }
        }
    }
)

function concatlists(list1, list2) {

    return {
        [Symbol.iterator] : function* () {
            yield* list1;
            yield* list2;
        }
    }
}

function* uniq(list) {

    const uniqitems = new Set();

    for(const item of list) if(uniqitems.size !== uniqitems.add(item).size) yield item;
}