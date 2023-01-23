/**
 * @module types/notfunction
 */

'use strict';

/**
 * Return `true` if *value* does not have type 'function'. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `notfunction()`</caption>
 * 
 * const { notfunction } = require('functionish/types');
 * 
 * notfunction(notfunction); // returns false
 * notfunction(x => x); // returns false
 * 
 * notfunction('function'); // returns true
 * 
 * @function notfunction
 * @see {@link module:types/isfunction isfunction()}
 * @param {function} func The value to test
 * @returns {boolean}
 */
function notfunction(func) {
    return (typeof func !== 'function');
}

module.exports = notfunction;
