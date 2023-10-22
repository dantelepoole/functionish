/**
 * @module math/isatmost
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is less than or equal to *a*. Otherwise, return `false`.
 * 
 * `isatmost()` is curried by default with unary arity.
 * 
 * @example
 * const isatmost = require('functionish/math/isatmost');
 * 
 * isatmost(1, 1); // returns true;
 * isatmost(42, 1); // returns true;
 * isatmost(0, 1); // returns false;
 * 
 * @function isatmost
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
function isatmost(a,b) {
    return (b <= a)
}

module.exports = curry(1, isatmost);