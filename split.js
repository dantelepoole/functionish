/**
 * @module split
 */

'use strict';

const isstring = require('./isstring');

/**
 * Function variant of {@link external:String.prototype.split String.prototype.split()}.
 * 
 * If *source* is not a string, an empty array is returned.
 * 
 * `split()` is curried by default.
 * 
 * @func split
 * @see {@link external:String.prototype.split String.prototype.split()}
 * @param {string} separator The delimiter string
 * @param {string} source The string to split
 * @returns {string[]}
 */
module.exports = require('./curry2')(

    function split(separator, source) {
        return isstring(source) ? source.split(separator) : [];
    }
)