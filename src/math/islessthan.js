/**
 * @module math/islessthan
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is less than *a*. Otherwise, return `false`.
 *
 * `islessthan()` is curried by default with unary arity.
 *  
 * @example
 * const islessthan = require('functionish/math/islessthan');
 * 
 * islessthan(42, 1); // returns true;
 * islessthan(0, 1); // returns true;
 * 
 * @function islessthan
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
function islessthan(a,b) {
    return (b < a)
}

module.exports = curry(1, islessthan);