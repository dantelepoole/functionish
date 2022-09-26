/**
 * @module not
 */

'use strict';

/**
 * Return the logical complement of *value*.
 * 
 * @example
 *    
 * const not = require('functionish/not');
 * 
 * not(true); // returns false
 * not(false); // returns true
 * 
 * @func not
 * @see {@link module:and and()}
 * @see {@link module:or or()}
 * @see {@link module:xor xor()}
 * @param {any} value The value to return the logical complement of.
 * @returns {boolean}
 */
module.exports = function not(value) {
    return ! value;
}