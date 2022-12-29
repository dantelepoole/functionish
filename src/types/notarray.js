/**
 * @module types/notarray
 */
'use strict';

const isarray = require('./isarray');

/**
 * Return `true` if *value* is not a Javascript native Array. Otherwise, return `false`.
 * 
 * @func notarray
 * @see {@link module:isarray isarray()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notarray(array) {
    return ! isarray(array);
}