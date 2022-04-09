'use strict';

/**
 * Return `true` if *a* is less than or equal to *b*, otherwise return `false`.
 * 
 * `islessthanorequal()` is curried by default.
 * 
 * @module islessthanorequal
 * @param {number} a The number to compare with
 * @param {number} b The number to compare against
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function islessthanorequal(a,b) {
        return (a <= b)
    }
)