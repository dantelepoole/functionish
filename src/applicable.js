/**
 * @module applicable
 */

'use strict';

/**
 * Return a function that passes *args* to its argument function and returns the result. 
 * 
 * @example <caption>Example usage of `applicable()`</caption>
 * 
 * const { applicable } = require('functionish');
 * 
 * const fortytwo = applicable(42);
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = x => (x%2) !== 0;
 * const isnumber = x => (typeof x === 'number');
 * 
 * fortytwo(iseven);    // true
 * fortytwo(isnumber);  // true
 * fortytwo(isodd);     // false
 * 
 * @function applicable
 * @param {...any} args The arguments to pass to the target function
 * @returns {function}
 */
function applicable(...args) {
    return func => func(...args);
}

module.exports = applicable;