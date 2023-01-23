/**
 * @module types/notobject
 */

'use strict';

/**
 * Return `true` if *value* does not have type `object` or if it is `null`.
 * 
 * @example <caption>Example usage of `notobject()`</caption>
 * 
 * const { notobject } = require('functionish/types');
 * 
 * notobject( {} ); // returns false
 * notobject( null ); // returns true
 * 
 * @function notobject
 * @see {@link module:types/isobject isobject()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notobject(value) {
    return (typeof value !== 'object' || value === null);
}

module.exports = notobject;