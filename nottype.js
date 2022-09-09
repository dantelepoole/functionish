/**
 * @module istype
 */

'use strict';

const curry2 = require('./curry2');

/**
 * Return `true` if *value* has the specified *type*. Null values will match types 'object' and 'null'.
 * 
 * @func istype
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = curry2(

    function istype(type, value) {
        return (typeof value === type) || (value === null && type === 'null');
    }
)