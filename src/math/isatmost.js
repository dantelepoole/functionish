/**
 * @module math/islessthanorequal
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is less than or equal to *a*. Otherwise, return `false`.
 * 
 * `islessthanorequal()` is curried by default with unary arity.
 * 
 * @example
 * const islessthanorequal = require('functionish/math/islessthanorequal');
 * 
 * islessthanorequal(1, 1); // returns true;
 * islessthanorequal(42, 1); // returns true;
 * islessthanorequal(0, 1); // returns false;
 * 
 * @function islessthanorequal
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
function islessthanorequal(a,b) {
    return (b <= a)
}

module.exports = curry(1, islessthanorequal);