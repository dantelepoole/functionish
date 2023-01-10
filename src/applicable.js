/**
 * @module applicable
 */

'use strict';

/**
 * Return a function that applies its argument function to *args* and returns the result. 
 * 
 * @example <caption>Example usage of `applicable()`</caption>
 * 
 * const { applicable } = require('functionish');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = x => (x%2) !== 0;
 * const isnumber = x => (typeof x === 'number');
 * 
 * const fortytwo = applicable(42);
 * 
 * fortytwo(iseven);    // true
 * fortytwo(isnumber);  // true
 * fortytwo(isodd);     // false
 * 
 * @function applicable
 * @param {...any} args The arguments to pass to the target function
 * @returns {function}
 */

module.exports = function applicable(...args) {
    return func => func(...args);
}