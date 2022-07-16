/**
 * @module islessthanorequal
 */

'use strict';

/**
 * Return `true` if *b* is less than or equal to *a*, otherwise return `false`.
 * 
 * `islessthanorequal()` is curried by default.
 * 
 * @func islessthanorequal
 * @param {number} a The number to compare against
 * @param {number} b The number to compare
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function islessthanorequal(a,b) {
        return (b <= a)
    }
)