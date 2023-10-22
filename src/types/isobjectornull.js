/**
 * @module types/isobjectornull
 */

'use strict';

/**
 * Return `true` if *value* has type `object`.
 * 
 * @example <caption>Example usage of `isobjectornull()`</caption>
 * 
 * const { isobjectornull } = require('functionish/types');
 * 
 * isobjectornull( {} ); // returns true
 * isobjectornull( 42 ); // returns false
 * isobjectornull( null ); // returns false
 * 
 * @function isobjectornull
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isobjectornull(value) {
    return (typeof value === 'object');
}

module.exports = isobjectornull;