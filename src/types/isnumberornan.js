/**
 * @module types/isnumberornan
 */

'use strict';

/**
 * Return `true` if *value* has type `number`.
 * 
 * @example <caption>Example usage of `isnumberornan()`</caption>
 * 
 * const { isnumberornan } = require('functionish/types');
 * 
 * isnumberornan(42); // returns true
 * isnumberornan(42.42); // returns true
 * 
 * isnumberornan(NaN); // returns true
 * isnumberornan(42n); // returns false
 * 
 * @function isnumberornan
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isnumberornan(value) {
    return (typeof value === 'number');
}

module.exports = isnumberornan;