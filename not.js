/**
 * @module not
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

/**
 * If *value* is a function, return a function that passes its arguments to *value* and returns the logical complement
 * of the result. Otherwise, return the logical complement of *value* itself.
 * 
 * @func not
 * @see {@link module:and and()}
 * @see {@link module:or or()}
 * @see {@link module:xor xor()}
 * @param {any} value The value to negate
 * @returns {(function|boolean)}
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
 */
module.exports = NAMED_FUNCTIONS ? not_named : not;

function not(value) {
    
    return (typeof value === 'function') 
         ? function _not(...args) { return ! value(...args) }
         : (! value);
}

function not_named(value) {

    if( typeof value !== 'function' ) return (! value);

    const negatedname = `negated ${value.name}`;

    const container = {
        [negatedname] : function (...args) {
            return ! value(...args);
        }
    
    }

    return container[negatedname];
}