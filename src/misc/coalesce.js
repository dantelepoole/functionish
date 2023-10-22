/**
 * @module misc/coalesce
 */

'use strict';

const curry = require('../curry');
const isvoid = require('../types/isvoid');

/**
 * to do
 * 
 * `coalesce()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `coalesce()`</caption>
 * 
 * const { coalesce } = require('functionish/misc');
 * 
 * coalesce(42, null);      // returns 42
 * coalesce(42, undefined); // returns 42
 * coalesce(42, NaN);       // returns NaN
 * coalesce(42, 'foobar');  // returns 'foobar'
 * 
 * @function coalesce
 * @param {any} defaultvalue The value to return if *value* is `null` or `undefined`
 * @param {} value The value to check
 * @returns {any}
 */
function coalesce(defaultvalue, value) {
    return isvoid(value) ? defaultvalue : value;
}

module.exports = curry(1, coalesce);