/**
 * @module types/isstring
 */

'use strict';

/**
 * Return `true` if *value* has type `string`. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `isstring()`</caption>
 * 
 * const { isstring } = require('functionish/types');
 * 
 * isstring('foobar'); // returns true
 * isstring(''); // returns true
 * isstring( String(1) ); // returns true
 * isstring( {}.toString() ); // returns true
 * 
 * isstring(42); // returns false
 * 
 * @function isstring
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isstring(value) {
    return (typeof value === 'string');
}

module.exports = isstring;