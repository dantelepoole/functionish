/**
 * @module type
 */

'use strict';

/**
 * Return *value*'s Javascript type or 'null' if *value* is `null` or 'NaN' if *value* is `NaN`.
 * 
 * @example
 * 
 * const type = require('functionish/type');
 * 
 * type(42); // returns 'number'
 * type(true); // returns 'boolean'
 * type(null); // returns 'null'
 * type({}); // returns 'object'
 * type(42n); // returns 'bigint'
 * type('foobar'); // returns 'string'
 * type( Symbol() ); // returns 'symbol'
 * type(); // returns 'undefined'
 * type( new Date() ); // returns 'object'
 * type(NaN); // returns 'NaN'
 * 
 * class Foobar {}
 * type(Foobar); // returns 'function'
 * 
 * @func type
 * @param {any} value The value whose type to return
 * @returns {string}
 */
module.exports = function type(value) {
    
    return (value === null) ? 'null'
         : (value !== value) ? 'NaN'
         : typeof value;
}