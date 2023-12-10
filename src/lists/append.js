/**
 * @module lists/append
 */

'use strict';

const EMPTY_STRING = '';

const isstring = require('../types/isstring');
const list = require('./list');

/**
 * If *list* is a string, return a new string with the *newitems* appended to *list* in order. Otherwise, *list* should
 * ben an iterable object, in which case a new list is returned with consists of the items *list* followed by *newitems*
 * in order.
 * 
 * `append()` always returns a list (i.e. iterable object), not an array, even if the input *list* is an array.
 * 
 * @example <caption>Example usage of `append()`</caption>
 * 
 * const { array } = require('functionish/lists');
 * 
 * array( 'foo', 'ba', 'r' ); // returns `foobar'
 * array( [1,2,3], 4, 5 ); // returns a iterable object that generates the numbers 1 through 5.
 * 
 * @function append
 * @param {iterable} list A string or iterable object to which to append the *newitems*
 * @param {...any[]} newitems One or more items to append to the *list*
 * @returns {iterable}
 * @throws {TypeError} if *list* is not a string or iterable object
 */
function append(list, ...newitems) {

    return isstring(list)
         ? list + newitems.join(EMPTY_STRING)
         : appendlists(list, newitems);
}

function appendlists(list1, list2) {
    
    return list(

        function* () {

            yield* list1;
            yield* list2;
        }
    )
}

module.exports = append;