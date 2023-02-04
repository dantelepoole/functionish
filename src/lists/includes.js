/**
 * @module lists/includes
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return `true` if any item in the *list* is strictly equal to *value*. Otherwise, return `false`.
 * 
 * `includes()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `includes()`</caption>
 * 
 * const { includes } = require('functionish/lists');
 * 
 * includes(42, [1,2,3,42,4,5]); // returns true
 * 
 * @function includes
 * @param {any} value The value to look for
 * @param {iterable} list An iterable object
 * @returns {boolean}
 */
function includes(value, list) {

    for(const item of list) if(item === value) return true;

    return false;
}

module.exports = curry2(includes);