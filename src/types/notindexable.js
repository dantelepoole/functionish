/**
 * @module types/notindexable
 */

'use strict';

const isindexable = require('./isindexable');
const not = require('./not');

/**
 * Return `false` if *value* is an indexable object, i.e. an array or a string or an non-null object that has a numeric
 * `length` property and, if the `length` property is not `0`, has a property with the numeric key `0` and a value that
 * is not `undefined`,  and a property with a numeric key equal to the value of its `length` property minus 1 with a 
 * value that is not `undefined`.
 *  
 * @example
 * const notindexable = require('functionish/types/notindexable');
 * 
 * notindexable( [] ); // returns false
 * notindexable( '' ); // returns false
 * notindexable( { length:2, [0]:'foo', [1]:'bar' } ); // returns false
 * notindexable( { length:0 } ); // returns false
 * notindexable( { length:1, [0]:42 } ); // returns false
 * 
 * notindexable( {} ); // returns true
 * notindexable( { length:1 } ); // returns true
 * notindexable( { length:2, [0]:42 } ); // returns true
 * 
 * @func notindexable
 * @see {@link module:types/isindexable isindexable()}
 * @param {any} value The value to check
 * @returns {boolean}
 */

module.exports = not(isindexable);