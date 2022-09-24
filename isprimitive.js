/**
 * @module isprimitive
 */

'use strict';

const TYPE_OBJECT = 'object';

const notfunction = require('./notfunction');

const notobject = value => (typeof value !== TYPE_OBJECT);

/**
 * Return `true` if *value* one of the Javascript primitive types: bigint, boolean, number, string, symbol or undefined.
 * 
 * @func isprimitive
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isprimitive(value) {
    return notfunction(value) && notobject(value);
}