/**
 * @module types/isnull
 */

'use strict';

/**
 * Return `true` if *value* is `null`, otherwise return `false`.
 * 
 * @example
 * const isnull = require('functionish/types/isnull');
 * 
 * isnull(null); // returns true
 * 
 * isnull(undefined); // returns false
 * isnull({}); // returns false
 * 
 * @function isnull
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isnull(value) {
    return (value === null);
}