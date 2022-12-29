/**
 * @module misc/coalesce
 */

'use strict';

const isdefined = require('../types/isdefined');

/**
 * Functional variant of the Javascript `??` operator that coalesces all <abbr title="null, undefined or NaN">void</abbr>
 * values, including `NaN`.
 * 
 * Return the first *value* that is not <abbr title="null, undefined or NaN">void</abbr>. If all *values* are
 * <abbr title="null, undefined or NaN">void</abbr>, return *defaultvalue*.
 * 
 * @example
 * const coalesce = require('functionish/misc/coalesce');
 * 
 * coalesce(42, null, undefined, NaN); // returns 42
 * coalesce(42, null, undefined, NaN, 'foobar'); // returns 'foobar'
 * 
 * @function coalesce
 * @static
 * @param {any} defaultvalue The value to return if all *values* are <abbr title="null, undefined or NaN">void</abbr>
 * @param {...any[]} values The values to check
 * @returns {any}
 */
module.exports = function coalesce(defaultvalue, ...values) {

    for(let i = 0; i < values.length; i++) if( isdefined(values[i]) ) return values[i];

    return defaultvalue;
}