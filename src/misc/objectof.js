/**
 * @module misc/objectof
 */

'use strict';

const curry = require('../curry');

/**
 * Return a new object with an own, enumerable property with the specified *key* and *value*.
 * 
 * `objectof()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `objectof()`</caption>
 * 
 * const { objectof } = require('functionish/misc');
 * 
 * objectof('foo', 'bar'); // returns { 'foo':'bar' }
 * 
 * @function objectof
 * @param {string} key The property's key
 * @param {any} value The property's value
 * @return {object}
 */
function objectof(key, value) {
    return { [key]:value }
}

module.exports = curry(1, objectof);