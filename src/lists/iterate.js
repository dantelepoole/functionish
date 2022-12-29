/**
 * @module lists/iterate
 */

'use strict';

const isfunction = require('./isfunction');
const resolvefunction = require('../resolvefunction');

/**
 * Pass each item in *list* to the *func* function.
 * 
 * @example
 *     
 * const iterate = require('functionish/lists/iterate');
 * 
 * iterate(console.log, [1,2,3]); // prints `2`, `4` and `6`
 *     
 * @func iterate
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 */
module.exports = function iterate(func, list) {

    isfunction(func) || (func = resolvefunction(func));

    for(const value of list) func(value);
}