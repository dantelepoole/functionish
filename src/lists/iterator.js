/**
 * @module lists/iterator
 */

'use strict';

/**
 * Return an iterator object that iterates over the items in *list*. If
 * *list* is not iterable, an error is thrown.
 * 
 * @example <caption>Example usage of `iterator()`</caption>
 * 
 * const { iterator } = require('functionish/iterator');
 * 
 * const iteration = iterator([1,2,3,4,5]);
 * 
 * let sum = 0;
 * let item = iteration.next();
 * while( ! item.done ) sum += item.value;
 * 
 * console.log(sum); // prints 15 to the screen
 * 
 * @function iterator
 * @param {iterable} list The iterable object to get an iterator for 
 * @returns {iterator}
 */
function iterator(list) {
    return list[Symbol.iterator]();
}

module.exports = iterator;