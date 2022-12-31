/**
 * @module math/isgreaterthanorequal
 */

'use strict';

/**
 * Return `true` if *b* is greater than or equal to *a*. Otherwise, return `false`.
 * 
 * @example
 * const isgreaterthanorequal = require('functionish/math/isgreaterthanorequal');
 * 
 * isgreaterthanorequal(1, 1); // returns true;
 * isgreaterthanorequal(1, 42); // returns true;
 * isgreaterthanorequal(1, 0); // returns false;
 * 
 * @function isgreaterthanorequal
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
module.exports = function isgreaterthanorequal(a,b) {
    return (b >= a)
}