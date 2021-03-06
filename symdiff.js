/**
 * @module symdiff
 */

'use strict';

const ERR_BAD_LIST = `SymDiffError~The %s list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable that produces the items from *list1* that are not present in *list2, in order, followed
 * by the items from *list1* that are not present in *list2*, in order. The returned iterable will not produce
 * any duplicates. 
 * 
 * `symdiff()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const symdiff = require('functionish/symdiff');
 * 
 * Array.from( symdiff( [1,2,3], [3,4,5] ) ); // returns [1,2,4,5]
 * 
 * @func symdiff
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function symdiff(list1, list2) {
    
        if( notiterable(list1) ) fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        else if ( notiterable(list2) ) fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        return {
            [Symbol.iterator] : function* () {
    
                const list2items = new Set(list2);

                for(const item of uniq(list1)) if( ! list2items.delete(item) ) yield item;

                yield* list2items.values();
            }
        }
    }
)

function* uniq(list) {

    const uniqitems = new Set();

    for(const item of list) if(uniqitems.size !== uniqitems.add(item).size) yield item;
}