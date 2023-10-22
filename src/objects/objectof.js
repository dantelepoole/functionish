/**
 * @module objects/objectof
 */

'use strict';

const curry = require('../curry');

/**
 * to do
 * 
 * `objectof()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `objectof()`</caption>
 * 
 * to do
 * 
 * @function objectof
 */
function objectof(key, value) {
    return { [key]:value }
}

module.exports = curry(1, objectof);