/**
 * @module ytypes/notnumber
 */

'use strict';

/**
 * Return `true` if *value* does not have type `number` or if it is `NaN`.
 * 
 * @example <caption>Example usage of `notnumber()`</caption>
 * 
 * const { notnumber } = require('functionish/types');
 * 
 * notnumber(42); // returns false
 * notnumber(42.42); // returns false
 * 
 * notnumber(NaN); // returns true
 * notnumber(42n); // returns true
 * 
 * @function notnumber
 * @see {@link module:types/isnumber isnumber()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notnumber(value) {
    return (typeof value !== 'number') || (value !== value);
}

module.exports = notnumber;