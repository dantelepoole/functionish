/**
 * @module types/type
 */

'use strict';

const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

/**
 * Return *value*'s Javascript type or 'null' if *value* is `null` or 'NaN' if *value* is `NaN`.
 * 
 * @example <caption>Example usage of `type()`</caption>
 * 
 * const { type } = require('functionish/types');
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
 * @function type
 * @param {any} value The value whose type to return
 * @returns {string}
 */
function type(value) {
    
    return (value === null) ? TYPE_NULL
         : (value === value) ? typeof value
         : TYPE_NAN;
}

module.exports = type;