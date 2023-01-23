/**
 * @module types/notstring
 */

'use strict';

/**
 * Return `true` if *value* does not have type `string`. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `notstring()`</caption>
 * 
 * const { notstring } = require('functionish/types');
 * 
 * notstring('foobar'); // returns false
 * notstring(''); // returns false
 * notstring( String(1) ); // returns false
 * notstring( {}.toString() ); // returns false
 * 
 * notstring(42); // returns true
 * 
 * @function notstring
 * @see {@link module:types/isstring isstring()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notstring(value) {
    return (typeof value !== 'string');
}

module.exports = notstring;