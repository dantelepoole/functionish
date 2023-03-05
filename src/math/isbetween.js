/**
 * @module math/isbetween
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *value* is a number between *lowerlimit* and *upperlimit* (both inclusive).
 * 
 * `isbetween()` is curried by default with binary arity.
 * 
 * @example
 * const isbetween = require('functionish/math/isbetween');
 * 
 * isbetween(0, 10, 42); // returns false;
 * isbetween(0, 10, 5); // returns true;
 * isbetween(0, 10, 0); // returns true;
 * isbetween(0, 10, 10); // returns true;
 * 
 * @function isbetween
 * @param {number} value The value to check
 * @returns {boolean}
 */
function isbetween(lowerlimit, upperlimit, value) {
    return (lowerlimit <= value) && (upperlimit >= value);
}

module.exports = curry(2, isbetween);