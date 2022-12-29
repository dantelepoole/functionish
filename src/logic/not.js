/**
 * @module logic/not
 */

'use strict';

const resolvefunction = require('../resolvefunction');

/**
 * Return a function that passed its arguments to *func* and returns the logical 
 * complement of *func*'s return value.
 * 
 * @example
 *    
 * const not = require('functionish/not');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = not(iseven);
 * 
 * isodd(1); // returns true
 * isodd(2); // returns false
 * 
 * @func not
 * @see {@link module:and and()}
 * @see {@link module:or or()}
 * @see {@link module:xor xor()}
 * @param {function} func The function to negate.
 * @returns {function}
 */
module.exports = function not(func) {

    isfunction(func) || (func = resolvefunction(func));

    return (...args) => ! func(...args);
}