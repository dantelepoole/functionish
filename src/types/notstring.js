/**
 * @module types/notstring
 */

'use strict';

/**
 * Return `true` if *value* does not have type `string`.
 * 
 * @func notstring
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notstring(value) {
    return (typeof value !== 'string');
}