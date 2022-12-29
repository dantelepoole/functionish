/**
 * @module types/isfunction
 */

'use strict';

/**
 * Return `true` if *value* has type 'function'. Otherwise, return `false`.
 * 
 * @example
 * const isfunction = require('functionish/types/isfunction');
 * 
 * isfunction(isfunction); // returns true
 * isfunction(x => x); // returns true
 * 
 * isfunction('function'); // returns false
 * 
 * @function isfunction
 * @param {value} value The value to check
 * @returns {boolean}
 */
module.exports = function isfunction(value) {
    return (typeof value === 'function');
}