/**
 * @module misc/haskey
 */

'use strict';

const curry = require('./curry');

/**
 * Return `true` if *source* has a property under the specified *key* with a value that is not `undefined`. This
 * function checks both own properties and inherited properties of *source*.
 * 
 * `haskey()` is curried by default with unary arity.
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
 * @param {object} source The object to search
 * @returns {boolean}
 */
function haskey(key, source) {
    return (source[key] !== undefined);
}

module.exports = curry(1, haskey);