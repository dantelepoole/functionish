/**
 * @module types/notsymbol
 */

'use strict';

/**
 * Return `true` if *value* does not have type `symbol`. Otherwise, return `false`.
 * 
 * @example
 * const notsymbol = require('functionish/types/notsymbol');
 * 
 * notsymbol( Symbol() ); // returns false
 * notsymbol( Symbol.for('foobar') ); // returns false
 * 
 * notsymbol(Symbol); // returns true
 * notsymbol('symbol'); // returns true
 * 
 * @func notsymbol
 * @see {@link module:types/issymbol issymbol()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notsymbol(value) {
    return (typeof value !== 'symbol');
}