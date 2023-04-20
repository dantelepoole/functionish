/**
 * @module lists/iterate
 */

'use strict';

const curry = require('../curry');

/**
 * Pass each item in *list* to the *func* function and return the *list*.
 * 
 * 
 * `iterate()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `iterate()`</caption>
 *     
 * const { iterate } = require('functionish/lists');
 * 
 * iterate(console.log, [1,2,3]); // prints `2`, `4` and `6`
 *     
 * @function iterate
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 * @returns {iterable} *list*
 */
function iterate(func, list) {

    for(const value of list) func(value);

    return list;
}

module.exports = curry(1, iterate);