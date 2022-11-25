/**
 * @module nottype
 */

'use strict';

const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

const curry2 = require('./curry2');

/**
 * Return `true` if *value* does not have the specified *type*. Be aware that `null` values match type 'null', not type
 * 'object' and that `NaN` values match type 'NaN', not type 'number'.
 * 
 * @func nottype
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = curry2(

    function nottype(type, value) {
        
        return (value === null) ? (type !== TYPE_NULL)
             : (value !== value) ? (type !== TYPE_NAN)
             : (value !== typeof value);
    }
)