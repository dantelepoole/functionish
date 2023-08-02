/**
 * @module misc/is
 */

'use strict';

const curry = require('../curry');

/**
 * [to do]
 * [warning: no NaN]
 * 
 * @example <caption>Example usage of `is()`</caption>
 *     
 * const { is } = require('functionish')
 * 
 * const iszero = is(0);
 * 
 * iszero(42); // returns false
 * iszero(0);  // returns true
 * 
 * @function is
 * @see {@link module:isnot isnot()} 
 * @param {any} a The value to compare with *b*
 * @param  {any} b The value to compare with *a*
 * @returns {boolean}
 */
function is(a, b) {
    return (a === b);
}

module.exports = curry(1, is);