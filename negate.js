/**
 * @module negate
 */

'use strict';

const notfunction = require('./notfunction');
const resolvefunction = require('./resolvefunction');

/**
 * Return a function that passes its arguments to *func* and returns the logical complement of the result.
 * 
 * @example
 *    
 * const negate = require('functionish/negate');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = negate(iseven);
 * 
 * isodd(42); // returns false
 * isodd(43); // returns true
 * 
 * not(true); // returns false
 * not(false); // returns true
 * 
 * @func negate
 * @param {any} func The function to negate
 * @returns {function}
 */
module.exports = function negate(func) {

    func = resolvefunction(func);
         
    return function negatedfunction(...args) {
        return ! func.call(this, ...args)
    }
}