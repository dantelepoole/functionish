/**
 * @module misc/islike
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if and only if *a* is deep strict equal to *b*. Otherwise, return `false`.
 * 
 * [Warning: +0 != -0]
 * 
 * `islike()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `islike()`</caption>
 *     
 * const { islike } = require('functionish')
 * 
 * const user1 = { id:42, name:'Hari Seldon' }
 * const user2 = { id:42, name:'Hari Seldon' }
 * const user3 = { id:24, name:'Someone Else' }
 * 
 * const islikehariseldon = islike(user1);
 * 
 * islikehariseldon(user2); // returns true
 * islikehariseldon(user3); // returns false
 * 
 * @function islike
 * @see {@link module:misc/notlike notlike()} 
 * @param {any} a The value to compare with *b*
 * @param  {any} b The value to compare with *a*
 * @returns {boolean}
 */
const islike = require('util').isDeepStrictEqual;

module.exports = curry(1, islike);