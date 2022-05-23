/**
 * @module concat
 */

'use strict';

/**
 * Pass *iterable2* to *iterable1*'s `concat()`-method and return the result. If *iterable1* has no `concat()` method,
 * return an iterable object that produces *iterable1*'s items followed by *iterable2*'s items.
 * 
 * `concat()` is curried by default.
 * 
 * @example
 * 
 * const concat = require('functionish/concat');
 * 
 * const hari = "Hari"
 * const seldon = "Seldon"
 * concat(hari, seldon); // returns 'HariSeldon'
 * 
 * const list1 = [1,2];
 * const list2 = [3,4];
 * concat(list1, list2); // returns '[1,2,3,4]'
 * 
 * @func concat
 * @param {iterable} iterable1 The iterable object to append *iterable2* to
 * @param  {iterable} iterable2 The iterable object to append to *iterable1*
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function concat(iterable1, iterable2) {
        
        return (typeof iterable1.concat === 'function') ? iterable1.concat(iterable2)
             : concatiterable(iterable1, iterable2);
    }
)

function concatiterable(iterable1, iterable2) {

    return {
        [Symbol.iterator] : function* () {
            for( const item of iterable1 ) yield item;
            for( const item of iterable2 ) yield item;
        }
    }
}