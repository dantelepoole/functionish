/**
 * @module types/notprimitive
 */

'use strict';

/**
 * Return `true` if *value* has type 'object' or 'function'. Otherwise, return `false`.
 * 
 * @func notprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notprimitive(value) {
    
    const valuetype = typeof value;

    return (valuetype === 'function' || valuetype === 'object');
}