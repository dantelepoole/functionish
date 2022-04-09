'use strict';

/**
 * Return `true` if *object* has a property under the specified *key* with value that is not `undefined`.
 * 
 * The *key* argument should be a string or symbol, though you can also search for numeric keys on indexable objects
 * such as an array.
 * 
 * `haskey()` is curried by default.
 * 
 * @module haskey
 * @param {(string|symbol|number)} key The key to search for
 * @param {(string|object)} object The object to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function haskey(key, object) {
        return (object?.[key] !== undefined);
    }
)