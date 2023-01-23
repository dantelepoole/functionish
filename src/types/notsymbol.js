/**
 * @module types/notsymbol
 */

'use strict';

/**
 * Return `true` if *value* does not have type `symbol`. Otherwise, return `false`.
 * 
 * @example <caption>Example usage of `notsymbol()`</caption>
 * 
 * const { notsymbol } = require('functionish/types');
 * 
 * notsymbol( Symbol() ); // returns false
 * notsymbol( Symbol.for('foobar') ); // returns false
 * 
 * notsymbol(Symbol); // returns true
 * notsymbol('symbol'); // returns true
 * 
 * @function notsymbol
 * @see {@link module:types/issymbol issymbol()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notsymbol(value) {
    return (typeof value !== 'symbol');
}

module.exports = notsymbol;