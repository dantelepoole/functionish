/**
 * @module findlist
 */

'use strict';

const ERR_BAD_LIST = `FindListError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Return the first produced by the *list* iterable for which the *predicate* function returns `true`. Return
 * `undefined` if no such item exists.
 * 
 * `findlist()` is curried by default withbinary arity.
 * 
 * @example
 *     
 * const findlist = require('functionish/findlist');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * findlist(iseven, [1,2,3,4]); // returns 2
 * findlist(iseven, [1,3,5]); // returns `undefined`
 * 
 * @func findlist
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {iterable} list An iterable object producing the items to search
 * @returns {any}
 */
module.exports = require('./curry2')(

    function findlist(predicate, list) {
        
        predicate = resolvefunction(predicate);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        for(const item of list) if( predicate(item) ) return item;
    }
)