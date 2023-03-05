/**
 * @module math/notbetween
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *value* is not a number between *lowerlimit* and *upperlimit* (both inclusive).
 * 
 * `notbetween()` is curried by default with binary arity.
 * 
 * @example
 * const notbetween = require('functionish/math/notbetween');
 * 
 * notbetween(0, 10, 42); // returns true;
 * notbetween(0, 10, 5); // returns false;
 * notbetween(0, 10, 0); // returns false;
 * notbetween(0, 10, 10); // returns false;
 * 
 * @function notbetween
 * @param {number} value The value to check
 * @returns {boolean}
 */
function notbetween(lowerlimit, upperlimit, value) {

    const isbetween = (lowerlimit <= value) && (upperlimit >= value);

    return !isbetween;
}

module.exports = curry(2, notbetween);