/**
 * @module lists/iterator
 */

'use strict';

const ERR_BAD_ITERATOR = `functionish/lists/iterator(): The list's Symbol.iterator property has type %s. Expected a funciton.`;

const exception = require('../errors/exception');
const isfunction = require('../types/isfunction');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const validateiteratorfunction = validator(
    exception('TypeError', ERR_BAD_ITERATOR, typeorclassname),
    isfunction
)

/**
 * Return an iterator object that iterates over the items in *list*. If *list* is not iterable, an error is thrown.
 * 
 * @example <caption>Example usage of `iterator()`</caption>
 * 
 * const { iterator } = require('functionish/lists');
 * 
 * const numberiterator = iterator( [1,2,3,4,5] );
 * 
 * let sum = 0;
 * let item = numberiterator.next();
 * while( !item.done ) sum += item.value;
 * 
 * console.log(sum); // prints 15 to the screen
 * 
 * @function iterator
 * @param {iterable} list The iterable object to get an iterator for 
 * @returns {object} An iterator object for *list*
 * @throws {TypeError} if the *list*'s [Symbol.iterator]- property is not a function.
 */
function iterator(list) {

    const __iterator = list?.[Symbol.iterator];

    validateiteratorfunction(__iterator);

    return __iterator.call(list);
}

module.exports = iterator;