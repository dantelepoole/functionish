/**
 * @module types/isboolean
 */

'use strict';

/**
 * Return `true` if *value* has type `boolean`. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `isboolean()`</caption>
 * 
 * const { isboolean } = require('functionish/types');
 * 
 * isboolean(true); // returns true
 * isboolean(false); // returns true
 * 
 * isboolean('true'); // returns false
 * isboolean(0); // returns false
 * 
 * @function isboolean
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isboolean(value) {
    return (typeof value === 'boolean');
}

module.exports = isboolean;