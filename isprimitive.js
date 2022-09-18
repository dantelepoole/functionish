/**
 * @module isprimitive
 */

'use strict';

const notfunction = require('./notfunction');
const notobject = require('./notobject');

/**
 * Return `true` if *value* is `null` or has one of the Javascript primitive types: bigint, boolean, number,
 * string, symbol or undefined
 * 
 * @func isprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isprimitive(value) {
    return notfunction(value) && notobject(value);
}