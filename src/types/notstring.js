/**
 * @module types/notstring
 */

'use strict';

/**
 * Return `true` if *value* does not have type `string`. Otherwise, return `false`.
 * 
 * @example
 * const notstring = require('functionish/types/notstring');
 * 
 * notstring('foobar'); // returns false
 * notstring(''); // returns false
 * notstring( String(1) ); // returns false
 * notstring( {}.toString() ); // returns false
 * 
 * notstring(42); // returns true
 * 
 * @func notstring
 * @see {@link module:types/isstring isstring()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notstring(value) {
    return (typeof value !== 'string');
}