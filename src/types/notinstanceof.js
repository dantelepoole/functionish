/**
 * @module types/notinstanceof
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return true if *instance* is not an instance of *targetclass*. Otherwise, return false.
 * 
 * `notinstanceof()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `notinstanceof()`</caption>
 * 
 * const { notinstanceof } = require('functionish/types');
 * 
 * notinstanceof(Date, new Date()); // returns false
 * notinstanceof(Object, {}); // returns false
 * 
 * notinstanceof(Array, new Date()); // returns true
 * notinstanceof(Object, 42); // returns true
 * 
 * @function notinstanceof
 * @see {@link module:types/isinstanceof isinstanceof()}
 * @param {function} targetclass The class to check against
 * @param {object} instance The object to check the class for
 * @returns {boolean}
 */
function notinstanceof(targetclass, instance) {
    return ! (instance instanceof targetclass);
}

module.exports = curry2(notinstanceof);
