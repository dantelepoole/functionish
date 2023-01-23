/**
 * @module types/notnull
 */

'use strict';

/**
 * Return `true` if *value* is not `null`. Otherwise return `false`.
 * 
 * @example <caption>Example usage of `notnull()`</caption>
 * 
 * const { notnull } = require('functionish/types');
 * 
 * notnull(null); // returns false
 * 
 * notnull(undefined); // returns true
 * notnull({}); // returns true
 * 
 * @function notnull
 * @see {@link module:types/isnull isnull()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notnull(value) {
    return (value !== null);
}

module.exports = notnull;