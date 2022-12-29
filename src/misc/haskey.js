/**
 * @module misc/haskey
 */

'use strict';

/**
 * Return `true` if *object* has a property under the specified *key* with a value that is not `undefined`.
 * 
 * @func haskey
 * @param {any} key The key to search for
 * @param {object} object The object to search
 * @returns {boolean}
 */
module.exports = function haskey(key, object) {
    return (object[key] !== undefined);
}