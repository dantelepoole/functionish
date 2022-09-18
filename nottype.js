/**
 * @module nottype
 */

'use strict';

const TYPE_NULL = 'null';

const curry2 = require('./curry2');
const isnull = require('./isnull');

/**
 * Return `true` if *value* does not have the specified *type*. Be aware that `null` values match type `null`, not type
 * `object`.
 * 
 * @func nottype
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = curry2(

    function nottype(type, value) {
        return isnull(value) ? (type !== TYPE_NULL) : (type !== typeof value);
    }
)