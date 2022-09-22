/**
 * @module haslength
 */

'use strict';

/**
 * Return `true` if *source* has a `length` property with the value *length*. Otherwise, return `false`.
 * 
 * `haslength()` is curried by default with binary arity.
 * 
 * @func haslength
 * @param {number} length The length to check from
 * @param {object} source The object whose length to check
 * @returns {boolean}
 */
module.exports = require('./curry2')(haslength);

function haslength(length, source) {
    return (source?.length === length);
}