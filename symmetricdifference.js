/**
 * @module symmetricdifference
 */

'use strict';

const partial = require('./partial');
const uniq = require('./uniq');

/**
 * Return an iterable that produces the items from *list1* that are not present in *list2, in order, followed by the
 * items from *list2* that are not present in *list1*, in order. The returned iterable will not produce any duplicates. 
 * 
 * `symmetricdifference()` is curried by default with binary arity.
 * 
 * @func symmetricdifference
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function symmetricdifference(list1, list2) {
    
        return {
            [Symbol.iterator] : function* () {
    
                const list2set = new Set(list2);
                const list1uniq = uniq(list1);
                const predicate = partial(list1diffpredicate, list2set);

                const list1diff = filteriterable(predicate, list1uniq);
                for(const item of list1diff) yield item;
    
                const list2diff = list2set.values();
                for(const item of list2diff) yield item;
            }
        }
    }
)

function list1diffpredicate(list2set, item) {
    return ! list2set.delete(item);
}

function filteriterable(predicate, iterable) {
    
    return {
        [Symbol.iterator] : function* () {
            for(const item of iterable) if( predicate(item) ) yield item;
        }
    }
}