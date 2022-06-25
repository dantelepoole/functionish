/**
 * @module withdefault
 */

'use strict';

const isnan = require('./isnan');

/**
 * Return *value* unless it is `null`, `undefined` or `NaN`, in which case *defaultvalue* is returned.
 * 
 * `withdefault()` is curried by default.
 * 
 * @example
 *     
 * const withdefault = require('functionish/withdefault');
 * 
 * withdefault(42, null); // returns 42
 * withdefault(42, undefined); // returns 42
 * withdefault(42, NaN); // returns 42
 * withdefault(42, 'foobar'); // returns 'foobar'
 * 
 * @func withdefault
 * @param {any} defaultvalue The value to return if *value* is `null`, `undefined` or `NaN`
 * @param {any} value The value to check and return unless it is `null`, `undefined` or `NaN`
 * @returns {any}
 */
module.exports = require('./curry2')(

    function withdefault(defaultvalue, value) {

        return (value !== null && value !== undefined && (typeof value !== 'number' || ! isnan(value))) 
             ? value
             : defaultvalue;
    }
)