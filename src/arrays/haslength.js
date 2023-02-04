/**
 * @module arrays/haslength
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return `true` if *source* has a `length` property with the value *length*. Otherwise, return `false`.
 * 
 * `haslength()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `haslength()`</caption>
 * 
 * const {haslength} = require('functionish/arrays');
 * 
 * haslength(1, [42]); // returns true
 * haslength(0, ''); // returns true
 * haslength(0, 'foobar'); // return false
 * 
 * @function haslength
 * @param {number} length The length to check from
 * @param {object} source The object whose length to check
 * @returns {boolean}
 */
function haslength(length, source) {
    return (source.length === length);
}

module.exports = curry2(haslength);