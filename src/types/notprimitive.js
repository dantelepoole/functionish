/**
 * @module types/notprimitive
 */

'use strict';

/**
 * Return `true` if *value* does not have one of the Javascript primitive types: bigint, boolean, number, string, symbol 
 * or undefined. Otherwise, return `false`.
 * 
 * `null` is not considered primitive, but `NaN` and `undefined` are.
 * 
 * @example
 * const notprimitive = require('functionish/types/notprimitive');
 * 
 * notprimitive(undefined); // returns false
 * notprimitive(NaN); // returns false
 * notprimitive(42); // returns false
 * notprimitive('string'); // returns false
 * notprimitive(true); // returns false
 * notprimitive(42n); // returns false
 * notprimitive( Symbol() ); // returns false
 * 
 * notprimitive(null); // returns true
 * notprimitive({}); // returns true
 * notprimitive([]); // returns true
 * notprimitive(isprimitive); // returns true
 * 
 * @func notprimitive
 * @see {@link module:types/isprimitive isprimitive()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notprimitive(value) {
    
    const valuetype = typeof value;

    return (valuetype === 'function' || valuetype === 'object');
}