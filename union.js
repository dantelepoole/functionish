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
 * @func union
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function union(list1, list2) {

        notiterable(list1) && fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        notiterable(list2) && fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        return {
            [Symbol.iterator] : function* () {

                const duplicateitems = new Set();
                const isuniq = item => (duplicateitems.size !== duplicateitems.add(item).size);

                for(const item of list1) if( isuniq(item) ) yield item;
                for(const item of list2) if( isuniq(item) ) yield item;

                duplicateitems.clear();
            }
        }
    }
)