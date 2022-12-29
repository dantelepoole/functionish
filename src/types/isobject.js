/**
 * @module types/isobject
 */

'use strict';

/**
 * Return `true` if *value* has type `object` and it is not `null`.
 * 
 * @example
 * const isobject = require('functionish/types/isobject');
 * 
 * isobject( {} ); // returns true
 * isobject( null ); // returns false
 * 
 * @function isobject
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isobject(value) {
    return (typeof value === 'object' && value !== null);
}