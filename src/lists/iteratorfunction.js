/**
 * @module lists/iteratorfunction
 */

'use strict';

const ERR_BAD_ITERATORFUNCTION = `functionish/lists/iteratorfunction(): The list's Symbol.iterator property has type %s. Expected a funciton.`;

const exception = require('../errors/exception');
const isfunction = require('../types/isfunction');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const validateiteratorfunction = validator(
    exception('TypeError', ERR_BAD_ITERATORFUNCTION, typeorclassname),
    isfunction
)

/**
 * Return *list*'s \@\@iterator function. If *list* is not iterable, an error is thrown.
 * 
 * @example <caption>Example usage of `iteratorfunction()`</caption>
 * 
 * const { iteratorfunction } = require('functionish/lists');
 * 
 * const iteratorfunc = iteratorfunction( [1,2,3,4,5] );
 * 
 * for( const num of iteratorfunc() ) {
 *      console.log(num)
 * }
 * 
 * @function iteratorfunction
 * @param {iterable} list The iterable object to get an iterator for 
 * @returns {function} A iterator function for *list*
 * @throws {TypeError} if the *list*'s [Symbol.iterator]- property is not a function.
 */
function iteratorfunction(list) {

    const __iterator = list?.[Symbol.iterator];

    validateiteratorfunction(__iterator);

    return __iterator.bind(list);
}

module.exports = iteratorfunction;