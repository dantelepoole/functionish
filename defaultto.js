/**
 * @module defaultto
 */

'use strict';

const isnan = require('./isnan');
const isvoid = require('./isvoid');

/**
 * Return *value* unless it is `null`, `undefined` or `NaN`, in which case *defaultvalue* is returned.
 * 
 * `defaultto()` is curried by default.
 * 
 * @example
 *     
 * const defaultto = require('functionish/defaultto');
 * 
 * defaultto(42, null); // returns 42
 * defaultto(42, undefined); // returns 42
 * defaultto(42, NaN); // returns 42
 * defaultto(42, 'foobar'); // returns 'foobar'
 * 
 * @func defaultto
 * @param {any} defaultvalue The value to return if *value* is `null`, `undefined` or `NaN`
 * @param {any} value The value to check and return unless it is `null`, `undefined` or `NaN`
 * @returns {any}
 */
module.exports = require('./curry2')(

    function defaultto(defaultvalue, value) {

        return isvoid(value) ? defaultvalue
             : (typeof value === 'number' && isnan(value)) ? defaultvalue
             : value; 
    }
)