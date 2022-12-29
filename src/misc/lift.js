/**
 * @module misc/lift
 */

'use strict';

/**
 * Return an array containing *value* as its only item. If *value* is `undefined` an empty array is returned.
 * 
 * @param {any} value 
 * @returns {any[]}
 */
module.exports = function lift(value) {
    return (value === undefined) ? [] : [value];
}