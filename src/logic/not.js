/**
 * @module logic/not
 */

'use strict';

const isfunction = require('../types/isfunction');
const loadfunction = require('../loadfunction');

/**
 * Coerce *func*'s return value to its boolean complement.
 * 
 * This function returns a function that passes it arguments to *func* and return the boolean complement
 * of *func*'s return value.
 * 
 * *func* may either be a function or the path to a package or module that exports a function.
 * 
 * @example
 * const not = require('functionish/logic/not');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = not(iseven);
 * 
 * isodd(1); // returns true
 * isodd(2); // returns false
 * 
 * @function not
 * @see {@link module:logic/and and()}
 * @see {@link module:logic/or or()}
 * @see {@link module:logic/xor xor()}
 * @see {@link module:loadfunction loadfunction()}
 * @param {(function|string)} func The function to negate.
 * @returns {function}
 */
module.exports = function not(func) {

    isfunction(func) || (func = loadfunction(func));

    return (...args) => ! func(...args);
}