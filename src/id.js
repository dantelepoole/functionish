/**
 * @module id
 */

'use strict';

/**
 * Return *value*.
 * 
 * @example <caption>Example usage of `id()`</caption>
 * 
 * const { id } = require('functionish');
 * 
 * id(42); // returns 42
 * 
 * @function id
 * @param {any} value The value to return
 * @returns {any}
 */
function id(value) {
    return value;
}

module.exports = id;