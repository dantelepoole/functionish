/**
 * @module misc/coalesce
 */

'use strict';

const curry = require('../curry');
const isdefined = require('../types/isdefined');
const isfunction = require('../types/isfunction');

/**
 * Functional variant of the Javascript `??` operator that coalesces all <abbr title="null, undefined or NaN">void</abbr>
 * values, including `NaN`.
 * 
 * `coalesce()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `coalesce()`</caption>
 * 
 * const { coalesce } = require('functionish/misc');
 * 
 * coalesce(42, null);      // returns 42
 * coalesce(42, undefined); // returns 42
 * coalesce(42, NaN);       // returns 42
 * coalesce(42, 'foobar');  // returns 'foobar'
 * 
 * @function coalesce
 * @param {any} defaultvalue The value to return if *value* is <abbr title="null, undefined or NaN">void</abbr>
 * @param {} value The value to check
 * @returns {any}
 */
function coalesce(defaultvalue, value) {

    return isdefined(value) ? value
         : isfunction(defaultvalue) ? defaultvalue()
         : defaultvalue;
}

module.exports = curry(1, coalesce);