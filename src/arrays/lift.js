/**
 * @module arrays/lift
 */

'use strict';

/**
 * Return an array containing *value* as its only item. If *value* is `undefined` an empty array is returned.
 * 
 * @example <caption>Example usage of `lift()`</caption>
 * 
 * const { lift } = require('functionish/misc');
 * 
 * lift(42);        // returns [42]
 * lift(null);      // returns [null]
 * lift(undefined); // returns []
 * 
 * @function lift
 * @param {any} value The value to lift
 * @returns {any[]}
 */
function lift(value) {
    return (value === undefined) ? [] : [value];
}

module.exports = lift;