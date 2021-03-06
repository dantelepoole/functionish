/**
 * @module isfunction
 */

'use strict';

/**
 * Return `true` if *value* has type 'function', otherwise `false`.
 * 
 * @func isfunction
 * @param {value} value The value to check
 * @returns {boolean}
 */
module.exports = function isfunction(value) {
    return (typeof value === 'function');
}