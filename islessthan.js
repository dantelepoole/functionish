/**
 * @module islessthan
 */

'use strict';

/**
 * Return `true` if *b* is less than *a*, otherwise return `false`.
 * 
 * `islessthan()` is curried by default.
 * 
 * @func islessthan
 * @param {number} a The number to compare against
 * @param {number} b The number to compare
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function islessthan(a,b) {
        return (b < a)
    }
)