/**
 * @module types/notfunction
 */

'use strict';

/**
 * Return `true` if *value* does not have type 'function'. Otherwise, return `false`.
 * 
 * @example
 * const notfunction = require('functionish/types/isfunnotfunctiontion');
 * 
 * notfunction(notfunction); // returns false
 * notfunction(x => x); // returns false
 * 
 * notfunction('function'); // returns true
 * 
 * @func notfunction
 * @see {@link module:types/isfunction isfunction()}
 * @param {function} func The value to test
 * @returns {boolean}
 */
module.exports = function notfunction(func) {
    return (typeof func !== 'function');
}
