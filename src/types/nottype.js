/**
 * @module types/nottype
 */

'use strict';

const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

/**
 * Return `true` if *value* does not have the specified *type*. 
 * 
 * `NaN` *value*s match type `NaN`, not type `number`. Similarly, `null` *value*s
 * match type `null`, not type `object`. 
 * 
 * @example
 * const nottype = require('functionish/types/nottype');
 * 
 * nottype('null', null); // returns false
 * nottype('object', null); // returns true
 * 
 * nottype('NaN', NaN); // returns false
 * nottype('number', NaN); // returns true
 * 
 * nottype('object', {}); // returns false
 * nottype('function', istype); // returns false
 * 
 * @func nottype
 * @see {@link module:types/istype istype()}
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function nottype(type, value) {
    
    return (value === null) ? (type !== TYPE_NULL)
            : (value !== value) ? (type !== TYPE_NAN)
            : (value !== typeof value);
}