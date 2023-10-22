/**
 * @module types/isinstanceof
 */

'use strict';

const curry = require('../curry');

/**
 * Return true if *instance* is an instance of *targetclass*. Otherwise, return false.
 * 
 * `isinstanceof()` is curried by default with unary arity.
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
 * @param {function} targetclass The class to check against
 * @param {object} instance The object to check the class for
 * @returns {boolean}
 */
function isinstanceof(targetclass, instance) {
    return (instance instanceof targetclass);
}

module.exports = curry(1, isinstanceof);