/**
 * @module types/notobject
 */

'use strict';

/**
 * Return `true` if *value* does not have type `object` or if it is `null`.
 * 
 * @example
 * const notobject = require('functionish/types/notobject');
 * 
 * notobject( {} ); // returns false
 * notobject( null ); // returns true
 * 
 * @func notobject
 * @see {@link module:types/isobject isobject()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notobject(value) {
    return (typeof value !== 'object' || value === null);
}