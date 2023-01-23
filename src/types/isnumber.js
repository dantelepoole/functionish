/**
 * @module types/isnumber
 */

'use strict';

/**
 * Return `true` if *value* has type `number` and it is not `NaN`.
 * 
 * @example <caption>Example usage of `isnumber()`</caption>
 * 
 * const { isnumber } = require('functionish/types');
 * 
 * isnumber(42); // returns true
 * isnumber(42.42); // returns true
 * 
 * isnumber(NaN); // returns false
 * isnumber(42n); // returns false
 * 
 * @function isnumber
 * @see {@link module:types/notnumber notnumber()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isnumber(value) {
    return (typeof value === 'number') && (value === value);
}

module.exports = isnumber;