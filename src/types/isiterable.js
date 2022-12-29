/**
 * @module types/isiterable
 */

'use strict';

const isfunction = require('./isfunction');
const notstring = require('./notstring');

/**
 * Return `true` if *iterable* appears to be an iterable object. This function checks whether *iterable*
 * has a `[Symbol.iterator]`-property with type 'function'.
 * 
 * Although in Javascript strings are considered iterable, this function does *not* recognize strings as iterable, since
 * in practice the intention is usually not to iterate over strings.
 * 
 * @example
 * const isiterable = require('functionish/types/isiterable');
 * 
 * isiterable([]); // returns true
 * isiterable( new Set() ); // returns true
 * isiterable( new Map() ); // returns true
 * 
 * isiterable('foobar'); // returns false
 * isiterable({}); // returns false
 * 
 * @function isiterable
 * @param {any} iterable The value to check
 * @returns {boolean}
 */
module.exports = function isiterable(iterable) {
    return isfunction(iterable?.[Symbol.iterator]) && notstring(iterable);
}