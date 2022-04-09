'use strict';

const tostring = require('./tostring');

/**
 * Function variant of {@link external:String.prototype.split String.prototype.split()}.
 * 
 * If *source* is not a string, it is converted to a string before splitting. However, if source is `null`, `undefined`
 * or `NaN`, it is converted to an empty string, not to 'null'/'undefined'/'NaN'.
 * 
 * `split()` is curried by default.
 * 
 * @module split
 * @param {string} separator The delimiter string
 * @param {string} source The string to split
 * @returns {string[]}
 */
module.exports = require('./curry2')(

    function split(separator, source) {
        return tostring(source).split(separator);
    }
)