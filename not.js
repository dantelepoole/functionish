/**
 * @module not
 */

'use strict';

const ERR_BAD_FUNCTION = `NotError~The argument has type %s. Expected a function.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const typeorclass = require('./typeorclass');

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

    isfunction(func) || fail(ERR_BAD_FUNCTION, typeorclass(func));

    return (...args) => ! func(...args);
}