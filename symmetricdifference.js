/**
 * @module symmetricdifference
 */

'use strict';

const partial = require('./partial');
const uniq = require('./uniq');

/**
 * Return an iterable that produces the items from *iterable1* that are not present in *iterable2, in order, followed
 * by the items from *iterable2* that are not present in *iterable1*, in order. The returned iterable will not produce
 * any duplicates. 
 * 
 * `symmetricdifference()` is curried by default with binary arity.
 * 
 * @func symmetricdifference
 * @param {iterable} iterable1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function symmetricdifference(list1, list2) {
    
        return {
            [Symbol.iterator] : function* () {
    
                const list2items = new Set(list2);
                const predicate = partial(diffpredicate, list2items);

                yield* filterlist(predicate, uniq(list1));
                yield* list2items.values();
            }
        }
    }
)

function diffpredicate(diffset, item) {
    return ! diffset.delete(item);
}

function filterlist(predicate, list) {
    
    return {
        [Symbol.iterator] : function* () {
            for(const item of list) if( predicate(item) ) yield item;
        }
    }
}