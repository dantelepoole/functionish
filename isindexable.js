/**
 * @module isindexable
 */

'use strict';

const hasownproperty = require('./hasownproperty');

/**
 * Return `true` if *value* is an indexable object, i.e. an array or a string or an non-null object that has a numeric
 * `length` property and, if the `length` property is not `0`, has a property with the numeric key `0` and a property
 * with a numeric key equal to the value of its `length` property minus 1.
 *  
 * @example
 * 
 * const isindexable = require('functionish/isindexable');
 * 
 * isindexable( [] ); // returns true
 * isindexable( '' ); // returns true
 * isindexable( {} ); // returns false
 * 
 * const obj = {
 *   length : 2,
 *   [0]    : 'foo',
 *   [1]    : 'bar'
 * }
 * 
 * isindexable( obj ); // returns true
 * 
 * const obj2 = { length:0 }
 * isindexable( obj2 ); // returns true
 * 
 * const obj3 = {
 *    length : 1,
 *    [0]    : 'foobar'
 * }
 * isindexable( obj3 ); // returns true
 * 
 * @func isindexable
 * @param {any} value The value to check
 * @returns {boolean}
 */

module.exports = function isindexable(value) {

    return (typeof value?.length !== 'number') ? false 
         : (typeof value === 'array')
            ||
           (typeof value === 'string')
            ||
           (value.length === 0)
            ||
           (value.length === 1 && hasownproperty(0, value))
            ||
           (hasownproperty(0, value) && hasownproperty(value.length-1, value));

}