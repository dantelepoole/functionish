/**
 * @module isgreaterthanorequal
 */

'use strict';

/**
 * Return `true` if *b* is greater than or equal to *a*, otherwise return `false`.
 * 
 * `isgreaterthanorequal()` is curried by default.
 * 
 * @func isgreaterthanorequal
 * @param {number} a The number to compare against
 * @param {number} b The number to compare
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function isgreaterthanorequal(a,b) {
        return (b >= a)
    }
)