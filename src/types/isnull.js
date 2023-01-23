/**
 * @module types/isnull
 */

'use strict';

/**
 * Return `true` if *value* is `null`, otherwise return `false`.
 * 
 * @example <caption>Example usage of `isnull()`</caption>
 * 
 * const { isnull } = require('functionish/types');
 * 
 * isnull(null); // returns true
 * 
 * isnull(undefined); // returns false
 * isnull({}); // returns false
 * 
 * @function isnull
 * @see {@link module:types/notnull notnull()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isnull(value) {
    return (value === null);
}

module.exports = isnull;