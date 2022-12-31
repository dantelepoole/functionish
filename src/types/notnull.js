/**
 * @module types/notnull
 */

'use strict';

/**
 * Return `true` if *value* is not `null`. Otherwise return `false`.
 * 
 * @example
 * const notnull = require('functionish/types/notnull');
 * 
 * notnull(null); // returns false
 * 
 * notnull(undefined); // returns true
 * notnull({}); // returns true
 * 
 * @func notnull
 * @see {@link module:types/isnull isnull()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notnull(value) {
    return (value !== null);
}