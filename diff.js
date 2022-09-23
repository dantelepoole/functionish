/**
 * @module diff
 */

'use strict';

const ERR_BAD_LIST = `DiffError~The %s list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable producing only those items from *list1* that are not present in *list2*, but without duplicates.
 * 
 * `diff()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const diff = require('functionish/diff');
 * 
 * Array.from( diff( [1,2,3], [3,4,5] ) ); // returns [1,2]
 *  
 * @func diff
 * @param {iterable} list2 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function diff(list1, list2) {

        notiterable(list1) && fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        notiterable(list2) && fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        return {
            [Symbol.iterator] : function* () {

                const isuniq = isuniqfactory(list2);

                for(const item of list1) if( isuniq(item) ) yield item;
            }
        }
    }
)

function isuniqfactory(list) {

    const uniqitems = new Set(list);

    return item => (uniqitems.size !== uniqitems.add(item).size);
}
