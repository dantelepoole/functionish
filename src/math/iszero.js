/**
 * @module math/iszero
 */

'use strict';

/**
 * Return `true` if *value* is `0`.
 * 
 * @example
 * const iszero = require('functionish/math/iszero');
 * 
 * iszero(42); // returns false;
 * iszero(0); // returns true;
 * iszero(-0); // returns true;
 * iszero(-1); // returns false;
 * 
 * @function iszero
 * @param {number} value The value to check
 * @returns {boolean}
 */
function iszero(value) {
    return (value === 0);
}

module.exports = iszero;