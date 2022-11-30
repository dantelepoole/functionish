/**
 * @module not
 */

'use strict';

const isfunction = require('./isfunction');

/**
 * Return the logical complement of *value*. If *value* is a function, a function is returned that
 * passes its arguments to *value* and returns the logical complement of *value*'s return value.
 * 
 * @example
 *    
 * const not = require('functionish/not');
 * 
 * not(true); // returns false
 * not(false); // returns true
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
 * @param {any} value The value to return the logical complement of.
 * @returns {boolean|function}
 */
module.exports = function not(value) {
    return isfunction(value) ? (...args) => (! value(...args)) : (! value);
}