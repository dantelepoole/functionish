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
 * @example
 * const isprimitive = require('functionish/types/isprimitive');
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
 * @see {@link module:types/notprimitive notprimitive()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isprimitive(value) {
    
    const valuetype = typeof value;

    return (valuetype !== 'function' && valuetype !== 'object')
}