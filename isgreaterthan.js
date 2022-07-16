/**
 * @module isgreaterthan
 */

'use strict';

/**
 * Return `true` if *b* is greater than *a*, otherwise return `false`.
 * 
 * `isgreaterthan()` is curried by default.
 * 
 * @func isgreaterthan
 * @param {number} a The number to compare against
 * @param {number} b The number to compare
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function isgreaterthan(a,b) {
        return (b > a)
    }
)