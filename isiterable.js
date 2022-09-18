/**
 * @module isiterable
 */

'use strict';

const isfunction = require('./isfunction');
const notstring = require('./notstring');

/**
 * Return `true` if *value* is recognized as an iterable object, meaning that *value* has a `[Symbol.iterator]`-property
 * that is a function. Iterator objects also qualify as being iterable.
 * 
 * Although in Javascript strings are considered iterable, this function does *not* recognize strings as iterable, since
 * in practice the intention is usually not to iterate over strings.
 * 
 * @func isiterable
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isiterable(value) {
    return isfunction(value?.[Symbol.iterator]) && notstring(value);
}