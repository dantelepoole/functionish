/**
* @module types/notundefined
*/

'use strict';

/**
 * Return `true` if and only if *value* is not `undefined`, otherwise return `false`.
 * 
 * @example <caption>Example usage of `notundefined()`</caption>
 * 
 * const { notundefined } = require('functionish/types');
 * 
 * notundefined(undefined); // returns false
 * notundefined(); // returns false
 * 
 * notundefined(null); // returns true
 * notundefined(NaN); // returns true
 * notundefined(42); // returns true
 * 
 * @function notundefined
 * @see {@link module:types/isundefined isundefined()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
function notundefined(value) {
    return (value !== undefined);
}

module.exports = notundefined;