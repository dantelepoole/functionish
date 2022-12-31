/**
 * @module math/islessthan
 */

'use strict';

/**
 * Return `true` if *b* is less than *a*. Otherwise, return `false`.
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
module.exports = function islessthan(a,b) {
    return (b < a)
}