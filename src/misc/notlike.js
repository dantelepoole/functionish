/**
 * @module misc/notlike
 */

'use strict';

const curry = require('../curry');
const islike = require('./islike');

/**
 * Return `true` if and only if *a* is deep equal to *b*. Otherwise, return `false`.
 * 
 * `islike()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `notlike()`</caption>
 *     
 * const { notlike } = require('functionish')
 * 
 * const user1 = { id:42, name:'Hari Seldon' }
 * const user2 = { id:42, name:'Hari Seldon' }
 * const user3 = { id:24, name:'Someone Else' }
 * 
 * const isnotlikehariseldon = notlike(user1);
 * 
 * isnotlikehariseldon(user2); // returns false
 * isnotlikehariseldon(user3); // returns true
 * 
 * @function notlike
 * @see {@link module:misc/islike islike()} 
 * @see {@link module:misc/notdeepequal notdeepequal()} 
 * @param {any} a The value to compare with *b*
 * @param  {any} b The value to compare with *a*
 * @returns {boolean}
 */
function notlike(a,b) {
    return ! islike(a,b);
}

module.exports = curry(1, notlike);