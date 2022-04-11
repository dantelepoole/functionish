'use strict';

const isvoid = require('./isvoid');

const defaultto = (defaultvalue, value) => isvoid(value) ? defaultvalue : value;

/**
 * Return *value* unless it is `null`, `undefined` or `NaN`, in which case *defaultvalue* is returned.
 * 
 * `defaultto()` is curried by default.
 * 
 * @module defaultto
 * @param {any} defaultvalue The value to return if *value* is `null`, `undefined` or `NaN`
 * @param {any} value The value to check and return unless it is `null`, `undefined` or `NaN`
 * @returns {any}
 * @example
 *     
 * const defaultto = require('functionish/defaultto');
 * 
 * defaultto(42, null); // returns 42
 * defaultto(42, undefined); // returns 42
 * defaultto(42, NaN); // returns 42
 * defaultto(42, 'foobar'); // returns 'foobar'
 */
module.exports = require('./curry2')(defaultto);