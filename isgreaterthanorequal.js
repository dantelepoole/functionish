'use strict';

/**
 * Return `true` if *a* is greater than or equal to *b*, otherwise return `false`.
 * 
 * `isgreaterthanorequal()` is curried by default.
 * 
 * @module isgreaterthanorequal
 * @param {number} a The number to compare with
 * @param {number} b The number to compare against
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function isgreaterthanorequal(a,b) {
        return (a >= b)
    }
)