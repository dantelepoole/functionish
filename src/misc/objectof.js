/**
 * @module misc/objectof
 */

'use strict';

/**
 * Return a new object with an own, enumerable property with the specified *key* and *value*. If the *key* is not a
 * string, it will be converted to a string before the property is set.
 * 
 * @func objectof
 * @param {string} key The property's key
 * @param {any} value The property's value
 * @return {object}
 */
module.exports = function objectof(key, value) {
    return { [key]:value }
}