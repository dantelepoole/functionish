/**
 * @module lists/append
 */

'use strict';

const curry2 = require('../curry2');
const isarray = require('../types/isarray');
const isstring = require('../types/isstring');

/**
 * Return an iterable object that produces *list1*'s items followed by *list2*'s items.
 * 
 * If *list1* is an array, a new array is returned containing the items of *list1* followed by those of *list2*.
 * 
 * If *list1* is a string, a new string is returned consisting of *list1* followed by *list2*.
 * 
 * Otherwise, *list1* is presumed to iterable and an iterable object is returned that generates
 * the items of *list1* followed by those of *list2*.
 * 
 * @example <caption>Example usage of `append()`</caption>
 * 
 * const { append } = require('functionish/lists');
 * 
 * Array.from( append([1,2], [3,4]) ); // returns '[1,2,3,4]'
 * 
 * @function append
 * @see {@link module:union union()}
 * @param {iterable} list1 The iterable object to append *list2* to
 * @param  {iterable} list2 The iterable object to append to *list1*
 * @returns {iterable}
 */
function append(list1, list2) {
    
    return isarray(list1) ? [...list1, ...list2]
         : isstring(list1) ? (list1 + list2)
         : appenditerable(list1, list2);
}

function appenditerable(list1, list2) {

    return {
        [Symbol.iterator] : function* () {
            yield* list1;
            yield* list2;
        }
    }
}

module.exports = curry2(append);