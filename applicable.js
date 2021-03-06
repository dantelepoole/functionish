/**
 * @module applicable
 */

'use strict';

/**
 * Return a function that applies its argument function to *args* and returns the result. 
 * 
 * The returned function has the signature `apply(*func*, ...*additionalargs*)`. It will invoke *func* with *args* as
 * well as *additionalargs* (if any).
 * 
 * @example
 * 
 * const applicable = require('functionish/applicable')
 * 
 * const iseven = x => (x%2) === 0;
 * const fortytwo = applicable(42);
 * 
 * fortytwo(iseven); // returns `true`;
 * 
 * @func applicable
 * @param {...any} args The arguments to apply the target function to
 * @returns {function}
 */

module.exports = function applicable(...args) {

    return function apply(func, ...additionalargs) {
        return func.call(this, ...args, ...additionalargs);
    }
}