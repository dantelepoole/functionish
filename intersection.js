/**
 * @module intersection
 */

'use strict';

const ERR_BAD_LIST = `IntersectionError~The %s list argument has type %s. Expected an iterable object.`;

const bind = require('./bind');

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable producing all items common to both *list1* and *list2*, but without duplicates.
 * 
 * `intersection()` is curried by default with binary arity.
 * 
 * @func intersection
 * @param {iterable} list1 An iterable object
 * @param {iterable} list2 Another iterable object to intersect with
 * @returns {iterable}
 */
module.exports = require('./curry2') (

    function intersection(list1, list2) {

        notiterable(list1) && fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        notiterable(list2) && fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        const intersectionfilter = bind('has', new Set(list1));

        const isuniq = isuniqfactory();
    
        return {
    
            [Symbol.iterator] : function* () {
                for(const item of list2) if( isuniq(item) && intersectionfilter(item) ) yield item;
            }
        }
    }
)

function isuniqfactory() {

    const uniqitems = new Set();

    return item => (uniqitems.size !== uniqitems.add(item).size);
}