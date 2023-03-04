/**
 * @module types/istype
 */

'use strict';

const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

const curry = require('../curry');

/**
 * Return `true` if *value* has the specified *type*. 
 * 
 * `NaN` *value*s match type `NaN`, not type `number`. Similarly, `null` *value*s
 * match type `null`, not type `object`. 
 * 
 * `istype()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `istype()`</caption>
 * 
 * const { istype } = require('functionish/types');
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
function istype(type, value) {

    return (value === null) ? (type === TYPE_NULL)
         : (value !== value) ? (type === TYPE_NAN)
         : (type === typeof value);

}

module.exports = curry(1, istype);