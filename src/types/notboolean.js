/**
 * @module types/notboolean
 */

'use strict';

/**
 * Return `true` if *value* does not have type `boolean`. Otherwise, return `false`.
 * 
 * @example
 * const notboolean = require('functionish/types/notboolean');
 * 
 * notboolean(true); // returns false
 * notboolean(false); // returns false
 * 
 * notboolean('true'); // returns true
 * notboolean(0); // returns true
 * 
 * @function notboolean
 * @see {@link module:types/isboolean isboolean()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notboolean(value) {
    return (typeof value !== 'boolean');
}