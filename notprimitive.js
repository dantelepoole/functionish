/**
 * @module notprimitive
 */

'use strict';

const TYPE_OBJECT = 'object';

const isfunction = require('./isfunction');

const isobject = value => (typeof value === TYPE_OBJECT);

/**
 * Return `true` if *value* has type 'object' or 'function'. Otherwise, return `false`.
 * 
 * @func notprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notprimitive(value) {
    return isfunction(value) || isobject(value);
}