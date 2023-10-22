/**
 * @module types/isobject
 */

'use strict';

/**
 * Return `true` if *value* has type `object` and it is not `null`.
 * 
 * @example <caption>Example usage of `isobject()`</caption>
 * 
 * const { isobject } = require('functionish/types');
 * 
 * isobject( {} ); // returns true
 * isobject( 42 ); // returns false
 * isobject( null ); // returns false
 * 
 * @function isobject
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isobject(value) {
    return (typeof value === 'object' && value !== null);
}

module.exports = isobject;