/**
 * @module math/isatleast
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is greater than or equal to *a*. Otherwise, return `false`.
 * 
 * `isatleast()` is curried by default with unary arity.
 * 
 * @example
 * const isatleast = require('functionish/math/isatleast');
 * 
 * isatleast(1, 1); // returns true;
 * isatleast(1, 42); // returns true;
 * isatleast(1, 0); // returns false;
 * 
 * @function isatleast
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
function isatleast(a,b) {
    return (b >= a)
}

module.exports = curry(1, isatleast);