/**
 * @module types/isstring
 */

'use strict';

/**
 * Return `true` if *value* has type `string`. Otherwise, return `false`.
 * 
 * @example
 * const isstring = require('functionish/types/isstring');
 * 
 * isstring('foobar'); // returns true
 * isstring(''); // returns true
 * isstring( String(1) ); // returns true
 * isstring( {}.toString() ); // returns true
 * 
 * isstring(42); // returns false
 * 
 * @function isstring
 * @see {@link module:types/notstring notstring()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isstring(value) {
    return (typeof value === 'string');
}