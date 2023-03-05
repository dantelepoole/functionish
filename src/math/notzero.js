/**
 * @module math/notzero
 */

'use strict';

/**
 * Return `true` if *value* is not `0`.
 * 
 * @example
 * const notzero = require('functionish/math/notzero');
 * 
 * notzero(42); // returns true;
 * notzero(0); // returns false;
 * notzero(-0); // returns false;
 * notzero(-1); // returns true;
 * 
 * @function notzero
 * @param {number} value The value to check
 * @returns {boolean}
 */
function notzero(value) {
    return (value !== 0);
}

module.exports = notzero;