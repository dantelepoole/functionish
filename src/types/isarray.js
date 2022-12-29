/**
 * @module types/isarray
 */
'use strict';

/**
 * Return true if the argument is an instance of the Javascript native Array class.
 * 
 * @example
 * const isarray = require('functionish/types/isarray');
 * 
 * isarray([]); // returns true
 * isarray( new Array(42) ); // returns true
 * 
 * isarray(Array); // returns false
 * 
 * @function isarray
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = Array.isArray;