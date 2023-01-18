/**
 * @module misc/coalesce
 */

'use strict';

const curry2 = require('../curry2');
const isdefined = require('../types/isdefined');

/**
 * Functional variant of the Javascript `??` operator that coalesces all <abbr title="null, undefined or NaN">void</abbr>
 * values, including `NaN`.
 * 
 * `coalesce()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of coalesce()</caption>
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
    return isdefined(value) ? value : defaultvalue;
}

module.exports = curry2(coalesce);