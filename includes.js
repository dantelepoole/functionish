/**
 * @module includes
 */

'use strict';

/**
 * Functional variant of {@link external:Array.prototype.includes Array.prototype.includes()}. Return `true` if *value*
 * matches any item in *list* using strict equality, otherwise return `false`.
 * 
 * `includes()` is curried by default.
 * 
 * @func includes
 * @see {@link external:Array.prototype.includes Array.prototype.includes()}
 * @param {any} value The value to look for
 * @param {any[]} list The array of items to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includes(value, list) {
        return list.includes(value);
    }
)