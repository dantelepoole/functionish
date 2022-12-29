/**
* @module types/isdefined
*/

'use strict';

/**
 * Return `true` if *value* is `undefined`, otherwise return `false`.
 * 
 * @example
 * const isundefined = require('functionish/types/isundefined');
 * 
 * isundefined(undefined); // returns true
 * isundefined(); // returns true
 * 
 * isundefined(null); // returns false
 * isundefined(NaN); // returns false
 * isundefined(42); // returns false
 * 
 * @function isundefined
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isundefined(value) {
    return (value === undefined);
}