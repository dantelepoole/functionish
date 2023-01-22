/**
 * @module misc/haskey
 */

'use strict';

const curry2 = require('./curry2');

/**
 * Return `true` if *object* has a property under the specified *key* with a value that is not `undefined`.
 * 
 * `haskey()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `haskey()`</caption>
 * 
 * const { haskey } = require('functionish/misc');
 * 
 * const user = { name:'Hari Seldon', id:42 }
 * 
 * haskey('name', user);  // returns true
 * haskey('email', user); // returns false
 * 
 * @function haskey
 * @param {any} key The key to search for
 * @param {object} object The object to search
 * @returns {boolean}
 */
function haskey(key, object) {
    return (object[key] !== undefined);
}

module.exports = curry2(haskey);