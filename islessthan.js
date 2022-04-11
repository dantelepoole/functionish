/**
 * @module islessthan
 */

'use strict';

/**
 * Return `true` if *a* is less than *b*, otherwise return `false`.
 * 
 * `islessthan()` is curried by default.
 * 
 * @func islessthan
 * @param {number} a The number to compare with
 * @param {number} b The number to compare against
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function islessthan(a,b) {
        return (a < b)
    }
)