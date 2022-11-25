/**
 * @module istype
 */

'use strict';

const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

const curry2 = require('./curry2');

/**
 * Return `true` if *value* has the specified *type*. Be aware that `null` values match type 'null', not type 'object',
 * and that `NaN` values match type 'NaN', not type 'number'.
 * 
 * `istype()` is curried by default with binary arity.
 * 
 * @func istype
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = curry2(

    function istype(type, value) {
        
        return (value == null) ? (type === TYPE_NULL)
             : (value !== value) ? (type === TYPE_NAN)
             : (type === typeof value);
    }
)