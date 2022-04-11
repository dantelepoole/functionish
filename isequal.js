/**
 * @module isequal
 */

'use strict';

const isequal = (a,b) => (a === b);

/**
 * Return `true` if *a* and *b* are strictly equal, otherwise return false.
 * 
 * `isequal()` is curried by default.
 * 
 * @func isequal
 * @param {any} a The value to compare with
 * @param {any} b The value to compare to
 * @returns {boolean}
 */
module.exports = require('./curry2')(isequal)