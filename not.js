/**
 * @module not
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

/**
 * If *expression* is a function, return a function that passes its arguments to *expression* and returns the logical
 * complement of the result. Otherwise, return the logical complement of *expression* itself.
 * 
 * @func not
 * @see {@link module:and and()}
 * @see {@link module:or or()}
 * @see {@link module:xor xor()}
 * @param {any} expression The expression to negate
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

function not(expression) {
    
    return (typeof expression === 'function') 
         ? function _not(...args) { return ! expression(...args) }
         : (! expression);
}

function not_named(expression) {

    if( typeof expression !== 'function' ) return (! expression);

    const negatedname = `negated ${expression.name}`;

    const container = {
        [negatedname] : function (...args) {
            return ! expression(...args);
        }
    
    }

    return container[negatedname];
}