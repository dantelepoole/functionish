/**
 * @module math/ismorethan
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if *b* is greater than *a*. Otherwise, return `false`.
 * 
 * `ismorethan()` is curried by default with unary arity.
 * 
 * @example
 * const ismorethan = require('functionish/math/ismorethan');
 * 
 * ismorethan(1, 42); // returns true;
 * ismorethan(1, 0); // returns false;
 * 
 * @function isgreaismorethanterthan
 * @param {number} a The value to compare against
 * @param {number} b The value to compare
 * @returns {boolean}
 */
function ismorethan(a,b) {
    return (b > a)
}

module.exports = curry(1, ismorethan);