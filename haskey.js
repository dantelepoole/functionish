/**
 * @module haskey
 */

'use strict';

/**
 * Return `true` if *object* has a property under the specified *key* with a value that is not `undefined`.
 * 
 * `haskey()` is curried by default.
 * 
 * @func haskey
 * @param {any} key The key to search for
 * @param {(string|object)} object The object to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function haskey(key, object) {
        return (object?.[key] !== undefined);
    }
)