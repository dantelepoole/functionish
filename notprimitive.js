/**
 * @module notprimitive
 */

'use strict';

const isfunction = require('./isfunction');
const isobject = require('./isobject');

/**
 * Return `true` if *value* is not `null` and has type 'object' or 'function'. Otherwise, return `false`.
 * 
 * @func notprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notprimitive(value) {
    return isfunction(value) || isobject(value);
}