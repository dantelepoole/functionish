/**
 * @module types/istype
 */

'use strict';

const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

/**
 * Return `true` if *value* has the specified *type*. 
 * 
 * `NaN` *value*s match type `NaN`, not type `number`. Similarly, `null` *value*s
 * match type `null`, not type `object`. 
 * 
 * @example
 * const istype = require('functionish/types/istype');
 * 
 * istype('null', null); // returns true
 * istype('object', null); // returns false
 * 
 * istype('NaN', NaN); // returns true
 * istype('number', NaN); // returns false
 * 
 * istype('object', {}); // returns true
 * istype('function', istype); // returns true
 * 
 * @function istype
 * @see {@link module:types/nottype nottype()}
 * @param {string} type The type to check for
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function istype(type, value) {

    return (value === null) ? (type === TYPE_NULL)
         : (value !== value) ? (type === TYPE_NAN)
         : (type === typeof value);

}