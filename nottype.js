/**
 * @module nottype
 */

'use strict';

const curry2 = require('./curry2');

/**
 * Return `true` if *value* does not have the specified *type*. Null values will match types 'object' and 'null'.
 * 
 * @func nottype
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = curry2(

    function nottype(type, value) {
        return (value !== null && typeof value !== type)
                ||
               (value === null && type !== 'null' && type !== 'object');
    }
)