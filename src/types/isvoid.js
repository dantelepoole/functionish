/**
 * @module types/isvoid
 */

'use strict';

const VOID_MARKER = Symbol();

/**
 * Return `true` if *value* is `null`, `undefined` or `NaN`. Otherwise, return `false`.
 * 
 * @example
 * const isvoid = require('functionish/types/isvoid');
 * 
 * isvoid(undefined); // returns true
 * isvoid(null); // returns true
 * isvoid(NaN); // returns true
 * 
 * isvoid(42); // returns false
 * 
 * @function isvoid
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isvoid(value) {
    return (value ?? VOID_MARKER) !== value;
}