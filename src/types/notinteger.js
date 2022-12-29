/**
 * @module types/notinteger
 */

'use strict';

const isinteger = Number.isSafeInteger;

/**
 * Return `true` if *value* is not a (safe) integer value, otherwise return `false`.
 * 
 * @func notinteger
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notinteger(x) {
    return ! isinteger(x);
}