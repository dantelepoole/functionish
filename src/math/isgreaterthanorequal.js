/**
 * @module math/isgreaterthanorequal
 */

'use strict';

/**
 * Return `true` if *b* is greater than or equal to *a*, otherwise return `false`.
 * 
 * @func isgreaterthanorequal
 * @param {number} a The number to compare against
 * @param {number} b The number to compare
 * @returns {boolean}
 */
module.exports = function isgreaterthanorequal(a,b) {
    return (b >= a)
}