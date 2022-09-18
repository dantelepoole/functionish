/**
 * @module lift
 */

'use strict';

const isundefined = require('./isundefined');

/**
 * Return an array containing *value* as its only item. If *value* is `undefined` an empty array is returned.
 * 
 * @param {any} value 
 * @returns {any[]}
 */
module.exports = function lift(value) {
    return isundefined(value) ? [] : [value];
}