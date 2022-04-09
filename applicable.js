/**
 * Return a function that applies its argument function to *args* and returns the result.
 * 
 * The returned function has the signature `_applicable(function, ...additionalargs)`. The
 * *additionalargs* are passed to *function* in addition to the *args* passed to `applicable()`.
 * 
 * @module applicable
 * @param {...any} args The arguments to pass to the received function
 * @returns {function}
 * @example
 * 
 * const applicable = require('functionish/applicable')
 * 
 * const iseven = x => (x%2) === 0;
 * const fortytwo = applicable(42);
 * 
 * console.log( fortytwo(iseven) ); // prints `true`;
 */

'use strict';

module.exports = function applicable(...args) {

    function _applicable(func, ...additionalargs) {
        return func(...args, ...additionalargs);
    }

    return _applicable;
}