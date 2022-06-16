/**
 * @module classname
 */

'use strict'

const prototostring = Object.prototype.toString;

/**
 * Return the name of the class (constructor) of *value*. If *value* is primitive, the name of its object constructor
 * is returned, i.e. the name of its type with a capital first letter.
 * 
 * This function works by passing *value* to the `Object.prototype.toString.call()` method. If *value* has a custom
 * class that does not implement a getter with the well-known symbol `Symbol.toStringTag` as key, a generic classname
 * of `Object` will be returned.
 * 
 * @param {any} value 
 * @returns {string}
 */
module.exports = function classname(value) {
    return prototostring.call(value).slice(8, -1);
}