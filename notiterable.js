/**
 * @module notiterable
 */

'use strict';

const isstring = require('./isstring');
const notfunction = require('./notfunction');

/**
 * Return `false` if *value* is recognized as an iterable object, meaning that *value* has a `[Symbol.iterator]`
 * property that is a function. Otherwise, return `true`.
 * 
 * Although strings are iterable in Javascript, this function will designate strings as not being iterable, since in 
 * practice treating strings as iterables is often not intended.
 * 
 * @func notiterable
 * @see {@link module:isiterable isiterable()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notiterable(value) {
    return notfunction(value?.[Symbol.iterator]) || isstring(value);
}