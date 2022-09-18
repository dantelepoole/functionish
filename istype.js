/**
 * @module istype
 */

'use strict';

const TYPE_NULL = 'null';

const curry2 = require('./curry2');

const isnull = require('./isnull');

/**
 * Return `true` if *value* has the specified *type*. Be aware that `null` values match type `null`, not type `object`.
 * 
 * @func istype
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = curry2(

    function istype(type, value) {
        return isnull(value) ? (type === TYPE_NULL) : (type === typeof value);
    }
)