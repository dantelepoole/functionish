/**
 * @module intersection
 */

'use strict';

const ERR_BAD_LIST = `IntersectionError~The list%d argument has type %s. Expected an iterable object.`;

const bind = require('./bind');
// const uniq = require('./uniq');

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

        if( notiterable(list1) ) fail(ERR_BAD_LIST, 1, typeorclass(list1));
        if( notiterable(list2) ) fail(ERR_BAD_LIST, 2, typeorclass(list2));

        const intersectionfilter = bind('has', new Set(list1));

        const uniqitems = new Set();
        const isuniq = item => (uniqitems.size !== uniqitems.add(item).size);
    
        return {
    
            [Symbol.iterator] : function* () {
                for(const item of list2) if( isuniq(item) && intersectionfilter(item) ) yield item;
            }
        }
    }
)