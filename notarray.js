/**
 * @module isarray
 */
'use strict';

const isarray = Array.isArray;

/**
 * Return `true` if *value* is not a Javascript native Array. Otherwise, return `false`.
 * 
 * @func notarray
 * @see {@link module:isarray isarray()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notarray(value) {
    return ! isarray(value);
}