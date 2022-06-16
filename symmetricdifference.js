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

    function symmetricdifference(iterable1, iterable2) {
    
        return {
            [Symbol.iterator] : function* () {
    
                const iterable2set = new Set(iterable2);
                const predicate = partial(diffpredicate, iterable2set);

                const iterable1diff = filteriterable(predicate, uniq(iterable1));
                for(const item of iterable1diff) yield item;
    
                const iterable2diff = iterable2set.values();
                for(const item of iterable2diff) yield item;
            }
        }
    }
)

function diffpredicate(diffset, item) {
    return ! diffset.delete(item);
}

function filteriterable(predicate, iterable) {
    
    return {
        [Symbol.iterator] : function* () {
            for(const item of iterable) if( predicate(item) ) yield item;
        }
    }
}