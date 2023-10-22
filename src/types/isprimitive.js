/**
 * @module types/isprimitive
 */

'use strict';

/**
 * Return `true` if *value* has one of the Javascript primitive types: bigint, boolean, number, string, symbol 
 * or undefined. Otherwise, return `false`.
 * 
 * `null` is not considered primitive, but `NaN` and `undefined` are.
 * 
 * @example <caption>Example usage of `isprimitive()`</caption>
 * 
 * const { isprimitive } = require('functionish/types');
 * 
 * isprimitive(undefined); // returns true
 * isprimitive(NaN); // returns true
 * isprimitive(42); // returns true
 * isprimitive('string'); // returns true
 * isprimitive(true); // returns true
 * isprimitive(42n); // returns true
 * isprimitive( Symbol() ); // returns true
 * 
 * isprimitive(null); // returns false
 * isprimitive({}); // returns false
 * isprimitive([]); // returns false
 * isprimitive(isprimitive); // returns false
 * 
 * @function isprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isprimitive(value) {

    const valuetype = typeof value;

    return (valuetype !== 'function' && valuetype !== 'object')
}

module.exports = isprimitive;