/**
 * @module types/issymbol
 */

'use strict';

/**
 * Return `true` if *value* has type `symbol`. Otherwise, return `false`.
 * 
 * @example
 * const issymbol = require('functionish/types/issymbol');
 * 
 * issymbol( Symbol() ); // returns true
 * issymbol( Symbol.for('foobar') ); // returns true
 * 
 * issymbol(Symbol); // returns false
 * issymbol('symbol'); // returns false
 * 
 * @function issymbol
 * @see {@link module:types/notsymbol notsymbol()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function issymbol(value) {
    return (typeof value === 'symbol');
}