/**
 * @module math/absolute
 */

'use strict';

/**
 * [to do]
 * 
 * @example
 * 
 * [to do]
 * 
 * @function absolute
 * @param {number} value The value to return the absolute of
 * @returns {number}
 */
function absolute(num) {
    return (num < 0) ? (num * -1) : num;
}

module.exports = absolute;