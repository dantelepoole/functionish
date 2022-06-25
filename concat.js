/**
 * @module concat
 */

'use strict';

const ERR_BAD_ITERABLE = `ConcatError~The %s has type %s. Expected an iterable object`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces *list1*'s items followed by *list2*'s items.
 * 
 * `concat()` is curried by default.
 * 
 * @example
 * 
 * const array = require('functionish/concat');
 * const concat = require('functionish/concat');
 * 
 * const list1 = [1,2];
 * const list2 = [3,4];
 * array( concat(list1, list2) ); // returns '[1,2,3,4]'
 * 
 * @func concat
 * @param {iterable} list1 The iterable object to append *list2* to
 * @param  {iterable} list2 The iterable object to append to *list1*
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function concat(list1, list2) {
        
        if( notiterable(list1) ) fail(ERR_BAD_ITERABLE, 'list1', typeorclass(list1));
        if( notiterable(list2) ) fail(ERR_BAD_ITERABLE, 'list2', typeorclass(list2));

        return {
            [Symbol.iterator] : function* () {
                for( const item of list1 ) yield item;
                for( const item of list2 ) yield item;
            }
        }
    }
)