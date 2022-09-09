/**
 * @module filterlist
 */

 'use strict';

const ERR_BAD_LIST = `FilterListError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces only those items in the *list* for which the *predicate* function returns
 * a truthy value.
 * 
 * `filterlist()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const filterlist = require('functionish/filterlist')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * filterlist(iseven, [1,2,3,4,5]); // return an iterable that produces 2 and 4
 * 
 * @func filterlist
 * @param {function} predicate The predicate function
 * @param {iterable} list The list of items to filter
 * @returns {iterable} 
 */

module.exports = require('./curry2')(

    function filterlist(predicate, list) {

        predicate = resolvefunction(predicate);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {

            [Symbol.iterator] : function* () {
                for(const item of list) if( predicate(item) ) yield item;
            }
        }
    }
)