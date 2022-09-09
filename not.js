/**
 * @module not
 */

'use strict';

const isfunction = require('./isfunction');
const isstring = require('./isstring');
const notfunction = require('./notfunction');
const resolvefunction = require('./resolvefunction');

/**
 * If *expression* is a function, return a function that passes its arguments to *expression* and returns the logical
 * complement of the result. Otherwise, return the logical complement of *expression* itself.
 * 
 * @example
 *    
 * const not = require('functionish/not');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = not(iseven);
 * 
 * isodd(42); // returns false
 * isodd(43); // returns true
 * 
 * not(true); // returns false
 * not(false); // returns true
 * 
 * @func not
 * @see {@link module:and and()}
 * @see {@link module:or or()}
 * @see {@link module:xor xor()}
 * @param {any} expression The expression to negate
 * @returns {(function|boolean)}
 */
module.exports = function not(expression) {

    return isstring(expression) ? not( resolvefunction(expression) )
         : notfunction(expression) ? ( ! expression )
         : complementfunction;
         
    function complementfunction(...args) {
        return ! expression.call(this, ...args)
    }
}