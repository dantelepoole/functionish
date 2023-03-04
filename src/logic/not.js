/**
 * @module logic/not
 */

'use strict';

/**
 * Return a function that passes it arguments to *func* and returns the boolean complement
 * of *func*'s return value.
 * 
 * [to do: negate argument if it is not a function]
 * 
 * @example <caption>Example usage of `not()`</caption>
 * 
 * const { not } = require('functionish/logic');
 * 
 * const iseven = x => (x%2) === 0;
 * const isodd = not(iseven);
 * 
 * isodd(1); // returns true
 * isodd(2); // returns false
 * 
 * @function not
 * @param {function} func The function to negate.
 * @returns {function}
 */
function not(func) {
    
    if(typeof func !== 'function') return !func;

    const _not = (...args) => !func(...args);

    return _not;
}

module.exports = not;