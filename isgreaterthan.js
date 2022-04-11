/**
 * @module isgreaterthan
 */

'use strict';

/**
 * Return `true` if *a* is greater than *b*, otherwise return `false`.
 * 
 * `isgreaterthan()` is curried by default.
 * 
 * @func isgreaterthan
 * @param {number} a The number to compare with
 * @param {number} b The number to compare against
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function isgreaterthan(a,b) {
        return (a > b)
    }
)