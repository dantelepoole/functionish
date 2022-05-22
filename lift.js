/**
 * @module lift
 */

'use strict';

const isdefined = require('./isdefined');

/**
 * Return an array containing *value* as its only item. If *value* is `undefined` or `null` an empty array is
 * returned.
 * 
 * @param {any} value 
 * @returns {any[]}
 */
module.exports = function lift(value) {
    return isdefined(value) ? [value] : [];
}