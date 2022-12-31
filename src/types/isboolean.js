/**
 * @module types/isboolean
 */

'use strict';

/**
 * Return `true` if *value* has type `boolean`. Otherwise, return `false`.
 * 
 * @example
 * const isboolean = require('functionish/types/isboolean');
 * 
 * isboolean(true); // returns true
 * isboolean(false); // returns true
 * 
 * isboolean('true'); // returns false
 * isboolean(0); // returns false
 * 
 * @function isboolean
 * @see {@link module:types/notboolean notboolean()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isboolean(value) {
    return (typeof value === 'boolean');
}