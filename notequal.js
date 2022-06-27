/**
 * @module notequal
 */

'use strict';

const notequal = (a,b) => (a !== b);

/**
 * Return `true` if *a* and *b* are not strictly equal, otherwise return false.
 * 
 * `notequal()` compares its arguments using the strictly equality operator `===`. This means that comparing `NaN` to
 * any value will always return `true`.
 * 
 * `isequal()` is curried by default.
 * 
 * @func notequal
 * @param {any} a The value to compare with
 * @param {any} b The value to compare to
 * @returns {boolean}
 */
module.exports = require('./curry2')(notequal)