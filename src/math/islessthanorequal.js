/**
 * @module math/islessthanorequal
 */

'use strict';

/**
 * Return `true` if *b* is less than or equal to *a*. Otherwise, return `false`.
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
module.exports = function islessthanorequal(a,b) {
    return (b <= a)
}