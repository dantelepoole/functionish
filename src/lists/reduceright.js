/**
 * @module lists/reduceright
 */

'use strict';

const isarray = require('./isarray');
const isfunction = require('./isfunction');
const resolvefunction = require('./resolvefunction');

/**
 * Functional variant of {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}. Reduces the
 * values in *list* in reverse order, starting with the *initialvalue* and using the *reducer* function.
 * 
 * @example
 * 
 * const reduceright = require('functionish/lists/reduceright');
 * const range = require('functionish/misc/range');
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduceright(sum, 0, [1,2,3]); // returns 6
 * reduceright(sum, 0, range(3)); //returns 6
 * 
 * @func reduceright
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */

module.exports = function reduceright(reducer, initialvalue, list) {

    isfunction(reducer) || (reducer = resolvefunction(reducer));
    
    isarray(list) || (list = [...list]);

    return list.reduceRight(reducer, initialvalue);
}