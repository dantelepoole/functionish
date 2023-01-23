/**
 * @module types/isinstanceof
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return true if *instance* is an instance of *targetclass*. Otherwise, return false.
 * 
 * `isinstanceof()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `isinstanceof()`</caption>
 * 
 * const { isinstanceof } = require('functionish/types');
 * 
 * isinstanceof(Date, new Date()); // returns true
 * isinstanceof(Object, {}); // returns true
 * 
 * isinstanceof(Array, new Date()); // returns false
 * isinstanceof(Object, 42); // returns false
 * 
 * @function isinstanceof
 * @see {@link module:types/notinstanceof notinstanceof()}
 * @param {function} targetclass The class to check against
 * @param {object} instance The object to check the class for
 * @returns {boolean}
 */
function isinstanceof(targetclass, instance) {
    return (instance instanceof targetclass);
}

module.exports = curry2(isinstanceof);