/**
 * @module math/isgreaterthanorequal
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is greater than or equal to *a*. Otherwise, return `false`.
 * 
 * `isgreaterthanorequal()` is curried by default with unary arity.
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
function isgreaterthanorequal(a,b) {
    return (b >= a)
}

module.exports = curry(1, isgreaterthanorequal);