/**
 * @module math/isgreaterthan
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is greater than *a*. Otherwise, return `false`.
 * 
 * `isgreaterthan()` is curried by default with unary arity.
 * 
 * @example
 * const isgreaterthan = require('functionish/math/isgreaterthan');
 * 
 * isgreaterthan(1, 42); // returns true;
 * isgreaterthan(1, 0); // returns false;
 * 
 * @function isgreaterthan
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
function isgreaterthan(a,b) {
    return (b > a)
}

module.exports = curry(1, isgreaterthan);