/**
 * @module math/islessthan
 */

'use strict';

/**
 * Return `true` if *b* is less than *a*, otherwise return `false`.
 * 
 * @func islessthan
 * @param {number} a The number to compare against
 * @param {number} b The number to compare
 * @returns {boolean}
 */
module.exports = function islessthan(a,b) {
    return (b < a)
}